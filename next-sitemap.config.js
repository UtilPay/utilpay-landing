/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://utilpay.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  transform: async (config, path) => {
    // Locale pages get higher priority
    const isLocalePage = /^\/[a-z]{2}$/.test(path);

    return {
      loc: path,
      changefreq: 'weekly',
      priority: isLocalePage ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
};
