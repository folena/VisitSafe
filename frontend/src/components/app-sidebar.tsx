'use client'

import { useMemo, useEffect } from 'react'
import {
  HomeIcon,
  LayoutDashboardIcon,
  ClipboardListIcon,
  UsersIcon,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'

import { TeamSwitcher } from '@/components/ui/team-switcher'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'

import { useListMyUnits } from '@/api/hooks/useListMyUnits'

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'))
  return match ? match[2] : undefined
}

function writeCookie(name: string, value: string, days = 30) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; path=/; expires=${expires}`
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = useMemo(() => {
    const email = readCookie('email') ?? ''
    const role = readCookie('role') ?? ''
    const name = email.split('@')[0]
    return { name, email, avatar: '/avatars/shadcn.jpg', role }
  }, [])

  const { data: propertiesData, isLoading, refetch } = useListMyUnits()

  const properties = useMemo(() => {
    if (!propertiesData) return []
    return propertiesData.map((unit) => ({
      id: unit.id!,
      name: `${unit.block} - ${unit.lot}`,
      logo: HomeIcon,
      plan: '',
    }))
  }, [propertiesData])

  useEffect(() => {
    if (!isLoading && properties.length > 0) {
      const current = readCookie('propertyId')
      const valid = current && properties.some((t) => t.id === current)
      if (!valid) {
        writeCookie('propertyId', properties[0].id)
      }
    }
  }, [isLoading, properties])

  const navMain = useMemo(() => {
    if (user.role === 'ADMIN') {
      return [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
        { title: 'Unidades', url: '/admin/units', icon: HomeIcon },
      ]
    }

    if (user.role === 'EMPLOYEE') {
      return [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
        { title: 'Liberações', url: '/employee/releases', icon: ClipboardListIcon },
      ]
    }

    if (user.role === 'OWNER') {
      return [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboardIcon },
        { title: 'Liberar Acesso', url: '/owner/releases', icon: ClipboardListIcon },
      ]
    }

    return []
  }, [user.role])

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        { user.role === 'OWNER' && (isLoading
          ? <div>Carregando unidades…</div>
          : <TeamSwitcher teams={properties} onRefresh={refetch} />)
        }
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}