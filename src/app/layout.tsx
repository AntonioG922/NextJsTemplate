import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "./components/providers/AuthProvider";
import { Layout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description: "Modern Next.js 15 starter template with App Router, Supabase auth, TanStack Query, Tailwind CSS, and Shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      </head>
      <body>
        <div id="root">
          <ThemeProvider>
            <AuthProvider>
              <Layout>
                {children}
              </Layout>
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
