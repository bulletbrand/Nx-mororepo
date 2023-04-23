const rootMain = require('../../../.storybook/main');
const { merge } = require('webpack-merge');

module.exports = {
  ...rootMain,

  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    ...rootMain.addons,
    '@nrwl/react/plugins/storybook',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    config = merge(config, {
      module: {
        rules: [
          {
            test: /\.pdf/,
            type: 'asset/resource',
          },
        ],
      },
    });

    return config;
  },
};
