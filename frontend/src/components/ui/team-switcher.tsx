'use client'

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { UnitAssociationForm } from "../unit-association-form"

interface Team {
  id: string
  name: string
  logo: React.ElementType
  plan: string
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'))
  return match ? match[2] : undefined
}

function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') return
  const maxAge = 30 * 24 * 60 * 60
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
}

export function TeamSwitcher({ teams, onRefresh }: { teams: Team[], onRefresh?: () => void }) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState<Team | null>(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  React.useEffect(() => {
    if (teams.length === 0) return
    const savedId = readCookie('propertyId')
    const found = teams.find((t) => t.id === savedId)
    const fallback = teams[0]
    const selected = found ?? fallback
    setActiveTeam(selected)
    writeCookie('propertyId', selected.id)
  }, [teams])

  const handleSelect = (team: Team) => {
    setActiveTeam(team)
    writeCookie('propertyId', team.id)
  }

  if (!activeTeam) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <SidebarMenuButton className="text-sm font-medium text-muted-foreground gap-2">
                <Plus className="size-4" />
                Adicionar primeira unidade
              </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ativar uma unidade</DialogTitle>
              </DialogHeader>
              <UnitAssociationForm onSuccess={() => { 
                setOpenDialog(false)
                onRefresh?.() // <--- Força o refetch das unidades
              }} />
            </DialogContent>
          </Dialog>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Unidades
            </DropdownMenuLabel>

            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => handleSelect(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                <span className="flex-1">{team.name}</span>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
              <DropdownMenuItem
                className="gap-2 p-2"
                onSelect={(e) => {
                  e.preventDefault() // Evita que o menu feche bruscamente
                  setTimeout(() => setOpenDialog(true), 100) // Aguarda o menu fechar antes de abrir o dialog
                }}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Adicionar unidade</div>
              </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Associar nova unidade</DialogTitle>
                </DialogHeader>
                <UnitAssociationForm onSuccess={() => setOpenDialog(false)} />
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}