import { createComponentExtension, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myPluginPlugin = createPlugin({
  id: 'my-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const MyPluginPage = myPluginPlugin.provide(
  createRoutableExtension({
    name: 'MyPluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const EntityMyPluginCard = myPluginPlugin.provide(
  createComponentExtension({
    name: 'EntityMyAwesomePluginCard',
    component: {
      lazy : () => 
        import('./components/EntityOveriviewCard').then(
          m => m.EntityOverviewCard),},
  }),
);

export const EntityMyPluginContent = myPluginPlugin.provide(createRoutableExtension({
  name: 'EntityMyPluginContent',
  component: () => import('./components/EntityOveriviewCard').then(m => m.EntityOverviewCard), mountPoint: rootRouteRef
}));
