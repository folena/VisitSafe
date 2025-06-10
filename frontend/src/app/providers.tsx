// src/app/providers.tsx
'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/site-header'
import { usePathname } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'

const queryClient = new QueryClient()

const AppSidebar = dynamic(
  () => import('@/components/app-sidebar').then((mod) => mod.AppSidebar),
  { ssr: false }
)

export function Providers({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const hideSidebar = ['/', '/login', '/register', '/wait'].includes(pathname)


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {hideSidebar ? (
        <>{children}</>
        ) : (
        <SidebarProvider>
            <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="px-4 lg:px-6 py-4 lg:py-6">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
