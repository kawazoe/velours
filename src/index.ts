import VlBinderPagePresenter from '@/components/VlBinderPagePresenter';
import VlBinderPresenter from '@/components/VlBinderPresenter';
import VlPromisePresenter from '@/components/VlPromisePresenter';

import { useEnumerableBinder, useIndexableBinder } from '@/composables/binders';
import { useIntersectionObserver } from '@/composables/intersectionObservers';
import { usePromise } from '@/composables/promises';

import { defineEnumerableBinderStore, defineIndexableBinderStore } from '@/stores/binderStore';
import { definePromiseStore } from '@/stores/promiseStore';

import * as Bookmarks from '@/bookmarks';

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
