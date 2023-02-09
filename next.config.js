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
};

module.exports = withPlugins(plugins, nextConfig);
