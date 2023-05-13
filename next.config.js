const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  // compiler: {
  //   removeConsole: true,
  // },
  images: {
    domains: ["images.ctfassets.net", "images1.content-gbl.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ["en-US", "de-DE"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: "/:location/:slug*",
        destination: "/:slug*?location=:location",
      }
    ];
  },
  webpack: (config, options) => {
    console.log(options.webpack.version); 
    const { isServer } = options; 
    config.experiments = { topLevelAwait: true, layers: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'idpsearch',
        remotes: {
          // nextpoc: `nextpoc@http://localhost:3000/_next/static/chunks/remoteEntry.js`
          nextpoc: `nextpoc@https://idp-pq05fmvb4-sesha3113.vercel.app/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
        },
        filename: 'static/chunks/remoteEntry.js'
      })
    );
    return config;
  }
};

module.exports = nextConfig;
