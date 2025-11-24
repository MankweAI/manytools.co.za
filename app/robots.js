// FILE: app/robots.js
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // Add any private routes if necessary
        },
        sitemap: 'https://manytools.co.za/sitemap.xml',
    }
}