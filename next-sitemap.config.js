/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.m2b.co.id',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    additionalSitemaps: [
      'https://blog.m2b.co.id/sitemap.xml',
    ],
  },
}
