const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withGraphql = require('next-plugin-graphql');
const withProgressBar = require('next-progressbar');
const withPlugins = require('next-compose-plugins');
const dotenv = require('dotenv');

dotenv.config();

const { GRAPHQL_HTTPS_URL, GRAPHQL_WS_URL } = process.env;

module.exports = withPlugins(
  [withProgressBar, withGraphql, withCss, withFonts, withImages],
  {
    env: {
      GRAPHQL_HTTPS_URL,
      GRAPHQL_WS_URL,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
      if (dev) {
        config.module.rules.push({
          test: /\.(jsx?|gql|graphql)$/,
          loader: 'eslint-loader',
          exclude: ['/node_modules/', '/.next/', '/helper_scripts/'],
          enforce: 'pre',
        });
      }
      return config;
    },
  }
);
