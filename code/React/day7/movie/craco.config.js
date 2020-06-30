const CracoLessPlugin = require('craco-less');
module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#3DB389' },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };