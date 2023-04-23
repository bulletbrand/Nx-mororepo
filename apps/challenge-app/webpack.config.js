const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const { merge } = require('webpack-merge');

module.exports = composePlugins(
  withNx(),
  withReact(),
  (config) => {
    return merge(config, {
      module: {
        rules: [
          {
            test: /\.pdf/,
            type: 'asset/resource',
          },
        ],
      },
    });
  });
