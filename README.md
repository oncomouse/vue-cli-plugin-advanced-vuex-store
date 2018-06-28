# @oncomouse/vue-cli-plugin-advanced-vuex-store

**Important:** Because of some limits in vue-cli's GeneratorAPI, only use this plugin *instead of* installing Vuex. Otherwise, you will have to remove a few things from the project, but ESLint will catch them, so you should be able to see what needs deleting if you install this later.

This plugin adds a more advanced Vuex store to your vue-cli projects. Specifically, it creates a store that uses [Vuex modules](https://vuex.vuejs.org/guide/modules.html), hot reloads those modules, and uses [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) to persist the store's state between reloads.

## Install:

```bash
vue add @oncomouse/advanced-vuex-store
```

