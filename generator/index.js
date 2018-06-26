module.exports = (api) => {
  const helpers = require('./helpers')(api); // eslint-disable-line global-require

  api.render((tree) => {
    if (Object.prototype.hasOwnProperty.call(tree, helpers.getStore())) {
      delete tree[helpers.getStore()]; // eslint-disable-line no-param-reassign
      const mainSrc = tree[helpers.getMain()];
      // eslint-disable-next-line no-param-reassign
      tree[helpers.getMain()] = mainSrc.replace(/import store from (["'])\.\/store["'](;{0,1})\n/, '');
    } else {
      api.extendPackage({
        dependencies: {
          vuex: '^3.0.1',
        },
      });
    }
    api.extendPackage({
      dependencies: {
        'vuex-persistedstate': '^2.5.4',
      },
    });
    const mainSrc = tree[helpers.getMain()];
    const imports = mainSrc.match(/import [0-9a-zA-Z_$]+ from (["'])[^'"]+["'](;{0,1})/g);
    const lastImport = imports.slice(-1)[0];
    const impPieces = lastImport.match(/import [0-9a-zA-Z_$]+ from (["'])[^'"]+["'](;{0,1})/);
    // eslint-disable-next-line no-param-reassign
    tree[helpers.getMain()] = mainSrc.replace(
      lastImport,
      `${lastImport}
import configureStore from ${impPieces[1]}./store${impPieces[1]}${impPieces[2]}

const store = configureStore()${impPieces[2]}`,
    );
  });
  api.render('./template');
};
