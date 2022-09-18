import type { App } from 'vue';

import VlBinderPagePresenter from '@/components/VlBinderPagePresenter';
import VlBinderPresenter from '@/components/VlBinderPresenter';
import VlPromisePresenter from '@/components/VlPromisePresenter';

import { useEnumerableBinder, useIndexableBinder } from '@/composables/binders';
import { useIntersectionObserver } from '@/composables/intersectionObservers';
import { usePromise } from '@/composables/promises';

import { defineEnumerableBinderStore, defineIndexableBinderStore } from '@/stores/binderStore';
import { definePromiseStore } from '@/stores/promiseStore';

import * as Bookmarks from '@/bookmarks';

function Velours(app: App) {
  app.component('vl-binder-page-presenter', VlBinderPagePresenter);
  app.component('vl-binder-presenter', VlBinderPresenter);
  app.component('vl-promise-presenter', VlPromisePresenter);
}

export {
  VlBinderPagePresenter,
  VlBinderPresenter,
  VlPromisePresenter,
  useEnumerableBinder,
  useIndexableBinder,
  useIntersectionObserver,
  usePromise,
  defineEnumerableBinderStore,
  defineIndexableBinderStore,
  definePromiseStore,
  Bookmarks,
  Velours,
};

export type {
  Metadata,
  Page,
  AsyncPage,
  AsyncPageStatus,
  BinderStatus,
  BinderState,
  BinderComposableOptions,
  IndexableBinderAdapter,
  EnumerableBinderAdapter,
} from '@/composables/binders';
export type {
  PromiseStatus,
  PromiseState,
  PromiseComposableOptions,
  PromiseAdapter,
} from '@/composables/promises';
export type {
  EnumerableBinderStore,
  EnumerableBinderStoreDefinition,
  IndexableBinderStore,
  IndexableBinderStoreDefinition,
} from '@/stores/binderStore';
export type {
  PromiseStore,
  PromiseStoreDefinition,
} from '@/stores/promiseStore';
