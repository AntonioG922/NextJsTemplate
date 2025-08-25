# Public Assets Directory

This folder contains static assets that are served directly by Next.js from the root URL path (`/`).

## Folder Structure

- `/images/` - General images (logos, banners, photos, etc.)
- `/icons/` - Icon files (custom icons, logos, etc.)
- `robots.txt` - SEO robots file for search engines
- `sitemap.xml` - SEO sitemap for search engines

## Usage

Files in this directory are served directly from the root:
- `public/images/logo.png` → accessible at `/images/logo.png`
- `public/icons/app-icon.svg` → accessible at `/icons/app-icon.svg`

## Note: Metadata Files

Favicon, manifest, and other metadata files are handled by Next.js automatically from the `src/app/` directory:
- `src/app/favicon.ico` → served at `/favicon.ico`
- `src/app/manifest.json` → served at `/manifest.json`
- `src/app/icon.svg` → served at `/icon`
- `src/app/apple-icon.svg` → served at `/apple-icon`

This follows Next.js 15 best practices for metadata file handling.

## Best Practices

### Images
```jsx
// Use next/image for optimized loading
import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/images/logo.png"
      alt="Company Logo"
      width={200}
      height={100}
    />
  )
}
```

### SEO Files
- Update `robots.txt` with your actual domain
- Update `sitemap.xml` with your actual URLs and domain
- Consider using Next.js dynamic sitemap generation for large sites

### Organization Tips
- Use descriptive folder names: `/images/product/`, `/images/team/`, etc.
- Optimize images before adding (use WebP when possible)
- Keep file names URL-friendly (lowercase, hyphens instead of spaces)
- Consider file sizes for performance

## Security Note
All files in this directory are publicly accessible. Do not put sensitive information here.