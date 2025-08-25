# Next.js Starter Template

A modern, production-ready Next.js 15 starter template with authentication, database integration, and a beautiful UI component system.

## ✨ Features

- **⚡ Next.js 15** - Latest Next.js with App Router and React 19
- **🔐 Authentication** - Complete auth system with Supabase and Google OAuth
- **💾 Database** - PostgreSQL with Supabase, including Row Level Security
- **🎨 UI Components** - Beautiful, accessible components with Shadcn/ui
- **🎯 TypeScript** - Full type safety with strict TypeScript configuration
- **📱 Responsive** - Mobile-first design with Tailwind CSS
- **🌙 Theme System** - Built-in light/dark mode support
- **⚡ Performance** - Optimized with TanStack Query for data fetching
- **📊 State Management** - Server state management with TanStack Query
- **🛠 Developer Experience** - ESLint, Prettier, and hot reload

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A Supabase account (for database and auth)

### 1. Clone & Install

```bash
# Clone this repository
git clone <your-repo-url>
cd nextjs-starter-template

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Google OAuth (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the following SQL in your Supabase SQL editor:

```sql
-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  first_name text,
  last_name text,
  avatar_icon text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

### 4. Start Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # App-specific components
│   │   ├── auth/          # Authentication components
│   │   ├── providers/     # Context providers
│   │   └── AvatarSelector/# Avatar selection system
│   ├── contexts/          # React contexts
│   ├── lib/               # App utilities and services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # Database services
│   │   ├── supabase/      # Supabase configuration
│   │   └── types.ts       # TypeScript type definitions
│   ├── profile/           # Profile page
│   ├── settings/          # Settings page
│   ├── docs/              # Documentation page
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── layout/           # Layout components
└── hooks/                # Global custom hooks
```

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form
- **Validation**: Zod

## 🎨 Customization

### Branding

1. Update the app metadata in `src/app/layout.tsx`
2. Modify the sidebar branding in `src/components/layout/AppSidebar.tsx`
3. Replace favicon and other static assets in the `public` directory
4. Update the manifest file for PWA settings

### Theme Colors

Customize your theme by editing CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: your-primary-hsl;
  --secondary: your-secondary-hsl;
  /* ... other variables */
}
```

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your component
3. Update navigation in `src/components/layout/AppSidebar.tsx` if needed

### Database Extensions

1. Add new table schemas to your Supabase database
2. Update the `Database` interface in `src/app/lib/types.ts`
3. Create service classes in `src/app/lib/services/`
4. Add React Query hooks for data fetching

## 🔐 Authentication

This template includes a complete authentication system:

- **Email/Password** authentication
- **Google OAuth** (optional)
- **Profile management** with avatars
- **Protected routes** with middleware
- **Row Level Security** in the database

### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Add the client ID to your `.env.local` file

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Connect your repo to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

This template can be deployed to any platform that supports Next.js:

- **Netlify**: Use the `@netlify/plugin-nextjs` plugin
- **Railway**: Deploy directly from GitHub
- **DigitalOcean App Platform**: Use the Node.js buildpack
- **AWS Amplify**: Deploy with the Next.js build settings

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query/latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Shadcn/ui](https://ui.shadcn.com) for the beautiful component system
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for the deployment platform

---

**Happy coding!** 🚀

If you find this template helpful, please consider giving it a ⭐ on GitHub!