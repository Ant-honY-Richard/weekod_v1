/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://weekod.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/test-results/'],
      },
    ],
    additionalSitemaps: [
      'https://weekod.in/sitemap.xml',
    ],
  },
  exclude: ['/404', '/500', '/api/*', '/admin/*', '/test-results/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  transform: async (config, path) => {
    // Custom priority based on page importance
    const customPriorities = {
      '/': 1.0,
      '/services': 0.9,
      '/portfolio': 0.8,
      '/blog': 0.8,
      '/contact': 0.7,
    };

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : config.changefreq,
      priority: customPriorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};