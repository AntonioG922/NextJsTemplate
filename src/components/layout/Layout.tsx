"use client"

import React from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { useAuthContext } from "@/app/components/providers/AuthProvider"
import { AuthContainer } from "@/app/components/auth/AuthContainer"
import useBodyBackground from "@/hooks/useBodyBackground"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { user, loading: authLoading } = useAuthContext()
  const pathname = usePathname()

  // Apply theme background to body
  useBodyBackground()

  const formatTitle = (segment: string) => {
    return segment
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ")
  }

  const segments = React.useMemo(() => pathname.split("/").filter(Boolean), [pathname])
  const crumbs = React.useMemo(() => {
    const base = [{ href: "/", label: formatTitle("Dashboard") }]
    const dynamic = segments.map((seg, idx) => ({
      href: `/${segments.slice(0, idx + 1).join("/")}`,
      label: formatTitle(seg),
    }))
    return pathname === "/" ? base : [...dynamic]
  }, [segments, pathname])

  // Show loading state while authentication is loading
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 8 9.74s8-4.19 8-9.74V7L12 2z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Next.js Template</h1>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show authentication screen if user is not authenticated
  if (!user) {
    return <AuthContainer />
  }

  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border/40 bg-background px-6">
          <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                  const isLast = index === crumbs.length - 1
                  return (
                    <React.Fragment key={crumb.href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast ? (
                        <BreadcrumbSeparator className={index === 0 ? "hidden md:block" : undefined} />
                      ) : null}
                    </React.Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="h-full p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}