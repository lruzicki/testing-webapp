/** @type {import('next').NextConfig} */

const withLess = require('next-with-less');
const nextComposePlugins = require('next-compose-plugins');

const { withPlugins } = nextComposePlugins.extend(() => ({}));

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: {},
    },
  ],
];
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  eslint: {
    dirs: ['pages', 'utils', 'app', 'components', 'src', '__tests__'],
  },
};

module.exports = withPlugins(plugins, nextConfig);
