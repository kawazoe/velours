# Velours

Velours is a small, strongly typed library that attempts to patch the rough edges regarding asynchronous data flows in
VueJS.

Other frameworks will often come with different sets of tools to simplify the use of promises and other observable data
sources in templates. VueJS is very spartan by comparison, only providing some high level examples of how to integrate
`fetch` with `ref`.

Velours not only turns this conversion into a one-liner, but also provides some advanced state and error management in
the process. Velours also comes with a whole abstraction for dealing with paginated data sources, completely
automatically, no matter the kind of API you are using.

## Installation

Just what you would expect from any other npm package:

`npm install velours`

## Usage

Velours exports multiple tools that are grouped into 2 different families:

### Promises
- `usePromise` is a simple composable that turns any promise into a powerful state machine.
- `definePromiseStore` is a pinia wrapper around `usePromise` when you want to cache data for an extended period of time.
- `VlPromisePresenter` is a component that exposes the promise state machine with slots in your templates.

The promise state machine can extrapolate different high level concepts like having content or not, or the nuances
between an initial load, refreshing existing data, or even retrying after an error occurred. All of this with only a few
slots (most of them being optional), and two methods.

```html
<template>
  <vl-promise-presenter :value="user">
    <template #initial>
      <button @click="getUser(42)">Press me!</button>
    </template>
    <template #loading>
      spinning...
    </template>
    <template #content="{value}">
      User name is {{value.username}}

      <button @click="getUser(42)">Press me again!</button>
    </template>
    <template #empty>
      Could not find user.

      <button @click="getUser(43)">Try another one!</button>
    </template>
    <template #error="{error}">
      Oh no... {{error}}

      <button @click="getUser(42)">It'll be better next time</button>
    </template>
    <template #refreshing>
      refreshing...
    </template>
    <template #retrying>
      retrying...
    </template>
  </vl-promise-presenter>
</template>
<script setup lang="ts">
import { usePromise, VlPromisePresenter } from 'velours';

type User = { username: string };

// We give a promise factory to usePromise to let the state machine control the calls.
const user = usePromise((id: number): Promise<User> =>
  fetch(`https://example.com/user/${id}`).then(r => r.json())
);

// The trigger action knows which parameters are expected by the fetch call and will require them. 
const getUser = (id: number) => user.trigger(id);
</script>
```

### Binders
- `Bookmarks` are a value type to help you uniquely identify and query pages from paginated source. They can be offset based, page number based, or even token based.
- `useEnumerableBinder` and `useIndexableBinder` are composables similar to `usePromise` that understands paginated sources.
- `defineEnumerableBinderStore` and `defineIndexableBinderStore` are pinia wrappers around the two composable binders.
- `VlBinderPresenter` and `VlBinderPagePresenter` are components that exposes the binder state machine with slots in your templates.
- `useIntersectionObserver` is a composable to help turning enumerable binders into infinite scrolling experiences.

Binders, while still very simple to use, have much more flexibility when dealing with chunked data sources. They provide
a similar state machine as `usePromise`, but expand the abstraction to deal with multiple pages at a time. Again, most
slots are optional. This example covers the use of enumerable binders with relative (page number based) bookmarks.
Indexable binders are used in a similar way, but have more features as they can directly index any page; useful when you
need a paginator in your UI. However, they cannot be used with progressive (token based) bookmarks.

```html
<template>
  <input type="search" v-model="searchQuery">
  <button @click="search(searchQuery)">Press me!</button>
  
  <vl-binder-presenter :value="results">
    <template #nested="{ pages }">
      <vl-binder-page-presenter v-for="page in pages" :value="page" :key="page.key">
        <template #loading>
          loading...
        </template>
        <template #content="{ value }" v-for="entry in value" :key="entry.username">
          {{entry.username}}
        </template>
        <template #empty>
          No results.
        </template>
        <template #error="{ error }">
          Oh no... {{error.bookmark}} {{error.message}}
        </template>
      </vl-binder-page-presenter>
    </template>
    <template #error="{error}">
      Oh no... {{error}}
    </template>
    <template #retrying>
      retrying...
    </template>
  </vl-binder-presenter>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import type { Page } from 'velours/composables/binders';
import { useEnumerableBinder, Bookmarks as B, VlBinderPresenter, VlBinderPagePresenter } from 'velours';

type User = { username: string };

const searchQuery = ref('');

// Like with usePromise, we give a factory to useEnumerableBinder, but this time, it has two stages:
// - one for the trigger parameters
// - one for the bookmark, the page id, for the call
const results = useEnumerableBinder((query: string) => (bookmark: B.RelativeBookmark | null): Promise<Page<User>> =>
    fetch(`https://example.com/users?q=${query}&p=${bookmark?.page}&s=${bookmark?.pageSize}`).then(r => r.json())
);

let binder;
const search = (query: string) => {
  binder = results.bind(query);

  // The state machine will keep track of what pages have been loaded, and which page is next in the list.
  binder.next();
}
const more = () => binder.next();
</script>
```
