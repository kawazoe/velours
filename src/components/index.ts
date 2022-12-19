import type { App } from 'vue';

import VlBinderPagePresenter from '@/components/VlBinderPagePresenter';
import VlBinderPresenter from '@/components/VlBinderPresenter';
import VlPromisePresenter from '@/components/VlPromisePresenter';

export function Velours(app: App) {
  app.component('vl-binder-page-presenter', VlBinderPagePresenter);
  app.component('vl-binder-presenter', VlBinderPresenter);
  app.component('vl-promise-presenter', VlPromisePresenter);
}

export {
  VlBinderPagePresenter,
  VlBinderPresenter,
  VlPromisePresenter,
};
