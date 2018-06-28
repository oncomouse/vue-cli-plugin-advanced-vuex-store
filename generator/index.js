module.exports = (api) => {
  // const helpers = require('./helpers')(api); // eslint-disable-line global-require
  api.extendPackage({
    dependencies: {
      vuex: '^3.0.1',
      'vuex-persistedstate': '^2.5.4',
    },
  });
  api.injectImports(api.entryFile(), 'import configureStore from \'./store\';');
  api.injectRootOptions(api.entryFile(), 'store: configureStore()');
  api.render('./template');
  /* api.render((tree) => {
     if (Object.prototype.hasOwnProperty.call(tree, helpers.getStore())) {
      // Get rid of the old store file:
      delete tree[helpers.getStore()]; // eslint-disable-line no-param-reassign
    } else {
      // Otherwise, we are installing vuex for the first time:
    }
     Install vuex-persistedstate:
     api.extendPackage({
       dependencies: {
         vuex: '^3.0.1',
         'vuex-persistedstate': '^2.5.4',
       },
     });
     if (Object.prototype.hasOwnProperty.call(api.generator.imports, api.entryFile())) {
      api.generator.imports[api.entryFile()]
        .entries()
        .filter(/import store/.test)
        .forEach(file => api.generator.imports[api.entryFile()].delete(file));
    }
     api.injectImports(api.entryFile(), 'import configureStore from \'./store\';');

     if (Object.prototype.hasOwnProperty.call(api.generator.rootOptions, api.entryFile())) {
      api.generator.imports[api.entryFile()].delete('store');
    }
     api.injectRootOptions(api.entryFile(), 'store: configureStore()');
   });

  // Render the other files in the template directory:
  */
};
