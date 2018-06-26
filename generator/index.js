module.exports = (api) => {
  const helpers = require('./helpers')(api); // eslint-disable-line global-require

  api.render((tree) => {
    if (Object.prototype.hasOwnProperty.call(tree, helpers.getStore())) {
      // Get rid of the old store file:
      delete tree[helpers.getStore()]; // eslint-disable-line no-param-reassign

      // Also remove the import statement for that file:
      const mainSrc = tree[helpers.getMain()];
      // eslint-disable-next-line no-param-reassign
      tree[helpers.getMain()] = mainSrc.replace(/import store from ["']\.\/store["'];{0,1}\n/, '');
    } else {
      // Otherwise, we are installing vuex for the first time:
      api.extendPackage({
        dependencies: {
          vuex: '^3.0.1',
        },
      });
    }
    // Install vuex-persistedstate:
    api.extendPackage({
      dependencies: {
        'vuex-persistedstate': '^2.5.4',
      },
    });
    // Load the main file source:
    const mainSrc = tree[helpers.getMain()];

    // Find the last import statement in the file:
    const imports = mainSrc.match(/import [0-9a-zA-Z_$]+ from (["'])[^'"]+["'](;{0,1})/g);
    const lastImport = imports.slice(-1)[0];

    // Make sure we maintain the project's syntax preferences:
    const impPieces = lastImport.match(/import [0-9a-zA-Z_$]+ from (["'])[^'"]+["'](;{0,1})/);

    // Add our new import statement and configure the store:
    // eslint-disable-next-line no-param-reassign
    tree[helpers.getMain()] = mainSrc.replace(
      lastImport,
      `${lastImport}
import configureStore from ${impPieces[1]}./store${impPieces[1]}${impPieces[2]}

const store = configureStore()${impPieces[2]}`,
    );
  });

  // Render the other files in the template directory:
  api.render('./template');
};
