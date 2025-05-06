import { MetadataRoute } from 'next'
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/resume/edit/'],
    },
    sitemap: 'https://sam-scripts.com/sitemap.xml',
  }
}