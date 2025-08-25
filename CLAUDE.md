# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint

### Development Workflow
- Use `npm run dev` for development with hot reloading
- Always run `npm run lint` before committing changes
- Test builds with `npm run build` before deployment

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and React 19
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with Google OAuth support
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS 4 with Shadcn/ui components
- **Type Safety**: TypeScript with strict configuration

### Project Structure

This project follows modern Next.js 15 conventions with domain-specific organization:

```
src/
├── hooks/          ← @/hooks/* - Custom React hooks
├── contexts/       ← @/contexts/* - React Context providers
├── services/       ← @/services/* - Database service classes
├── constants/      ← @/constants/* - Application constants
├── types/          ← @/types/* - TypeScript type definitions
├── utils/          ← @/utils/* - Utility functions
├── supabase/       ← @/supabase/* - Supabase client configuration
├── components/     ← @/components/* - Reusable UI components
│   ├── ui/         ← Shadcn/ui components
│   └── layout/     ← Layout components (sidebar, etc.)
└── app/           ← Next.js App Router
    ├── components/ ← App-specific components (auth, providers)
    ├── profile/    ← User profile page & components
    ├── settings/   ← Settings page & components
    ├── docs/       ← Documentation page & components
    ├── privacy/    ← Privacy policy page
    ├── terms/      ← Terms of service page
    ├── layout.tsx  ← Root layout
    ├── page.tsx    ← Homepage
    ├── favicon.ico ← Favicon (Next.js metadata)
    ├── manifest.json ← PWA manifest (Next.js metadata)
    ├── icon.svg    ← App icon (Next.js metadata)
    └── apple-icon.svg ← Apple touch icon (Next.js metadata)

public/            ← Static assets served from root
├── README.md      ← Guide for public folder usage
├── robots.txt     ← SEO robots file
├── sitemap.xml    ← SEO sitemap
├── images/        ← General images
└── icons/         ← Custom icons
```

#### Domain-Specific Organization
- **Hooks** (`@/hooks/*`): All custom React hooks in one location
- **Contexts** (`@/contexts/*`): React Context providers (theme, etc.)
- **Services** (`@/services/*`): Database service classes with centralized data access
- **Constants** (`@/constants/*`): Application-wide constants (avatarIcons, etc.)
- **Types** (`@/types/*`): TypeScript definitions and interfaces
- **Utils** (`@/utils/*`): Utility functions (cn, googleAuth, etc.)

#### App Router Structure
- **Clean routing**: Direct page mapping (app/profile → /profile)
- **Feature components**: Page-specific components in `_components/` folders
- **App-specific code**: Authentication and providers in `app/components/`
- **Metadata files**: Favicon, manifest, and icons handled by Next.js

#### Component Architecture
- **Shadcn/ui**: Reusable UI components in `src/components/ui/`
- **Layout System**: Sidebar navigation and layout components
- **Feature Components**: Organized by page with extracted sub-components
- **Authentication**: Complete auth flow with Google One Tap integration

### Key Features
- **Authentication**: Complete auth system with Google OAuth
- **Profile Management**: User profiles with customizable avatars
- **Theme System**: Light/dark mode with custom theme switching
- **Mobile Responsive**: Built-in responsive design patterns
- **Type Safety**: Full TypeScript integration

### Styling Guidelines
- **Tailwind CSS**: Uses standard Shadcn/ui color system
- **Theme Support**: Dark mode via CSS custom properties
- **Responsive Design**: Mobile-first approach
- **Component Library**: Consistent design system with Shadcn/ui

### Authentication Flow
- **Supabase Auth**: Email/password and Google OAuth
- **Google One Tap**: Seamless authentication experience
- **Row Level Security**: Database-level user isolation
- **Profile Management**: User profiles with avatar support

### Development Patterns
- **Service Classes**: Use service pattern for database operations (`@/services/*`)
- **React Query**: Leverage TanStack Query hooks from `@/hooks/*` for data fetching
- **Component Composition**: Follow Shadcn/ui patterns for new components
- **Type Safety**: Always use predefined types from `@/types/types.ts`
- **Import Aliases**: Use domain-specific aliases for clean imports:
  - `@/hooks/useAuth` - Custom React hooks
  - `@/contexts/ThemeContext` - Context providers  
  - `@/services/profileService` - Database services
  - `@/utils/googleAuth` - Utility functions
  - `@/constants/avatarIcons` - Application constants

### Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)

### Database Schema
Basic schema includes:
- **profiles**: User profile information with avatar support
- All tables include RLS policies and timestamp triggers
- Extensible structure for adding application-specific tables

## Customization Guidelines

### Adding New Features
1. **Pages**: Create new routes in `src/app/` with `_components/` for page-specific components
2. **Components**: Add reusable components to `src/components/ui/` for shared usage
3. **Services**: Create service classes in `src/services/` for database operations
4. **Hooks**: Add custom hooks to `src/hooks/` for reusable logic
5. **Types**: Define TypeScript types in `src/types/types.ts`
6. **Constants**: Add constants to `src/constants/` organized by domain
7. **Utils**: Add utilities to `src/utils/` for shared helper functions

### Database Extensions
1. Add new table definitions to the Database interface in `@/types/types.ts`
2. Create corresponding service classes in `@/services/` following existing patterns
3. Implement proper RLS policies in Supabase
4. Add React Query hooks in `@/hooks/` for data fetching

### UI Customization
1. **Colors**: Modify theme colors in `src/app/globals.css` and `@/contexts/ThemeContext`
2. **Components**: Extend Shadcn/ui components in `@/components/ui/`
3. **Layout**: Modify navigation in `@/components/layout/AppSidebar.tsx`
4. **Branding**: Update metadata in `src/app/layout.tsx` and manifest files
5. **Static Assets**: Add images/icons to `public/` for direct serving

### Metadata & SEO
1. **Favicon/Icons**: Update files in `src/app/` (favicon.ico, icon.svg, apple-icon.svg)
2. **Manifest**: Modify `src/app/manifest.json` for PWA configuration
3. **SEO Files**: Update `public/robots.txt` and `public/sitemap.xml`

### TypeScript Configuration
The project includes domain-specific path aliases for clean imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/hooks/*": ["./src/hooks/*"],
      "@/contexts/*": ["./src/contexts/*"],
      "@/services/*": ["./src/services/*"],
      "@/constants/*": ["./src/constants/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/supabase/*": ["./src/supabase/*"],
      "@/components/*": ["./src/components/*"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

### Best Practices
- Follow the established folder structure and naming conventions
- Use domain-specific import aliases (`@/hooks/*`, `@/services/*`, etc.)
- Use TypeScript for all new code with proper type definitions
- Implement proper error handling and loading states
- Write responsive, accessible components
- Use the existing service patterns for database operations
- Leverage React Query for efficient data fetching
- Place page-specific components in `_components/` folders
- Use `public/` for static assets, `src/app/` for metadata files