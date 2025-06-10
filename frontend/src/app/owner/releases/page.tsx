"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useListMyUnits } from '@/api/hooks/useListMyUnits'
import { useListMyReleasesByPeriod } from '@/api/hooks/useListMyReleasesByPeriod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Plus, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import ReleaseStepForm from '@/components/release-form'
import UpdateReleaseForm from '@/components/update-release-form'
import LateExitApproval from '@/components/late-exit-approval'
import LateExitNotification from '@/components/late-exit-notification'

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'))
  return match ? match[2] : undefined
}

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse: (str: string) => new Date(str),
  startOfWeek: (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  },
  getDay: (date: Date) => new Date(date).getDay(),
  locales,
})

function EditReleaseModal({ release, onSuccess }: { release: any, onSuccess: () => void }) {
  const [validFrom, setValidFrom] = useState(release.validFrom)
  const [validUntil, setValidUntil] = useState(release.validUntil)
  const [dailyStart, setDailyStart] = useState(release.dailyStart)
  const [dailyEnd, setDailyEnd] = useState(release.dailyEnd)

  const handleSave = () => {
    // Implement save logic
    onSuccess()
  }

  const handleDelete = () => {
    // Implement delete logic
    onSuccess()
  }

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Liberação</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Visitante</Label>
            <div className="text-sm text-gray-600">
              {release.visitorName} ({release.releaseType})
            </div>
            <div className="text-sm text-gray-500">
              Documento: {release.visitorDocument}
            </div>
          </div>
          <div>
            <Label>Data e Hora de Início</Label>
            <Input 
              type="datetime-local" 
              value={validFrom} 
              onChange={(e) => setValidFrom(e.target.value)} 
            />
          </div>
          <div>
            <Label>Data e Hora de Término</Label>
            <Input 
              type="datetime-local" 
              value={validUntil} 
              onChange={(e) => setValidUntil(e.target.value)} 
            />
          </div>
          <div>
            <Label>Horário Permitido de Entrada</Label>
            <Input 
              type="time" 
              value={dailyStart} 
              onChange={(e) => setDailyStart(e.target.value)} 
            />
          </div>
          <div>
            <Label>Horário Permitido de Saída</Label>
            <Input 
              type="time" 
              value={dailyEnd} 
              onChange={(e) => setDailyEnd(e.target.value)} 
            />
          </div>
          <div className="flex justify-between">
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Remover Liberação
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => onSuccess()}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Add calendarStyles for light/dark mode
const calendarStyles = `
  .rbc-toolbar button {
    color: var(--foreground);
    background-color: var(--background);
    border-color: var(--border);
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    transition: all 0.2s;
  }
  .rbc-toolbar button:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
    border-color: var(--accent);
  }
  .rbc-toolbar button.rbc-active {
    background-color: var(--primary);
    color: var(--primary-foreground);
    border-color: var(--primary);
  }
  .rbc-toolbar button.rbc-active:hover {
    background-color: var(--primary);
    color: var(--primary-foreground);
    border-color: var(--primary);
    opacity: 0.9;
  }
  .rbc-toolbar button:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
  }
  .rbc-toolbar-label {
    color: var(--foreground);
    font-weight: 600;
  }
  .rbc-header {
    color: var(--foreground);
    font-weight: 600;
    border-color: var(--border);
  }
  .rbc-off-range-bg {
    background-color: var(--muted);
  }
  .rbc-today {
    background-color: var(--accent);
  }
  .rbc-event {
    background-color: transparent;
    border: none;
    padding: 2px 4px;
  }
  .rbc-event.rbc-selected {
    background-color: transparent;
  }
  .rbc-event.bg-blue {
    background-color: #3b82f6;
  }
  .rbc-event.bg-orange {
    background-color: #f97316;
  }
  .rbc-event.bg-green {
    background-color: #22c55e;
  }
  .rbc-event:hover {
    opacity: 0.9;
  }
  .rbc-show-more {
    color: var(--primary);
  }
  .rbc-time-view {
    border-color: var(--border);
  }
  .rbc-timeslot-group {
    border-color: var(--border);
  }
  .rbc-time-header-content {
    border-color: var(--border);
  }
  .rbc-time-content {
    border-color: var(--border);
  }
  .rbc-time-header {
    border-color: var(--border);
  }
  .rbc-time-gutter {
    border-color: var(--border);
  }
  .rbc-time-slot {
    border-color: var(--border);
  }
  .rbc-toolbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
  .rbc-btn-group {
    display: flex;
    gap: 0.25rem;
  }
  .rbc-toolbar button + button {
    margin-left: 0;
  }
  .rbc-month-view {
    border-color: var(--border);
  }
  .rbc-month-row {
    border-color: var(--border);
  }
  .rbc-month-row + .rbc-month-row {
    border-top-color: var(--border);
  }
  .rbc-day-bg + .rbc-day-bg {
    border-left-color: var(--border);
  }
  .rbc-day-slot .rbc-time-slot {
    border-top-color: var(--border);
  }
  .rbc-time-header-gutter {
    border-color: var(--border);
  }
  .rbc-time-content > * + * > * {
    border-left-color: var(--border);
  }
  .rbc-agenda-view table.rbc-agenda-table {
    border-color: var(--border);
  }
  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
    border-color: var(--border);
  }
  .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    border-color: var(--border);
  }
  .rbc-agenda-date-cell {
    color: var(--foreground);
  }
  .rbc-agenda-time-cell {
    color: var(--foreground);
  }
  .rbc-agenda-date-cell.future {
    color: var(--muted-foreground);
  }
  .rbc-agenda-time-cell.future {
    color: var(--muted-foreground);
  }
  :root {
    .rbc-toolbar button {
      background-color: white;
      border-color: rgba(226, 232, 240, 0.5);
      color: #1a1a1a;
    }
    .rbc-toolbar button:hover {
      background-color: #f1f5f9;
      border-color: rgba(203, 213, 225, 0.5);
    }
    .rbc-toolbar button.rbc-active {
      background-color: #1a1a1a;
      color: white;
      border-color: #1a1a1a;
    }
    .rbc-toolbar button.rbc-active:hover {
      background-color: #2a2a2a;
      border-color: #2a2a2a;
    }
    .rbc-toolbar-label {
      color: #1a1a1a;
    }
    .rbc-header {
      color: #1a1a1a;
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-off-range-bg {
      background-color: #f8fafc;
    }
    .rbc-today {
      background-color: #f1f5f9;
    }
    .rbc-show-more {
      color: #1a1a1a;
    }
    .rbc-agenda-view table.rbc-agenda-table {
      color: #1a1a1a;
    }
    .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
      color: #1a1a1a;
      background-color: #f8fafc;
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
      color: #1a1a1a;
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-agenda-date-cell {
      color: #1a1a1a;
    }
    .rbc-agenda-time-cell {
      color: #1a1a1a;
    }
    .rbc-agenda-date-cell.future {
      color: #64748b;
    }
    .rbc-agenda-time-cell.future {
      color: #64748b;
    }
    .rbc-time-view {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-time-header {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-time-header-content {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-time-gutter {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-time-slot {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-timeslot-group {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-month-view {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-month-row {
      border-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-month-row + .rbc-month-row {
      border-top-color: rgba(226, 232, 240, 0.5);
    }
    .rbc-day-bg + .rbc-day-bg {
      border-left-color: rgba(226, 232, 240, 0.5);
    }
  }
  .dark {
    .rbc-toolbar button {
      background-color: #1a1a1a;
      border-color: rgba(42, 42, 42, 0.5);
      color: white;
    }
    .rbc-toolbar button:hover {
      background-color: #2a2a2a;
      border-color: rgba(58, 58, 58, 0.5);
    }
    .rbc-toolbar button.rbc-active {
      background-color: white;
      color: #1a1a1a;
      border-color: white;
    }
    .rbc-toolbar button.rbc-active:hover {
      background-color: #f1f5f9;
      border-color: #f1f5f9;
    }
    .rbc-toolbar-label {
      color: white;
    }
    .rbc-header {
      color: white;
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-off-range-bg {
      background-color: #1a1a1a;
    }
    .rbc-today {
      background-color: #2a2a2a;
    }
    .rbc-show-more {
      color: white;
    }
    .rbc-agenda-view table.rbc-agenda-table {
      color: white;
    }
    .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
      color: white;
      background-color: #1a1a1a;
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
      color: white;
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-agenda-date-cell {
      color: white;
    }
    .rbc-agenda-time-cell {
      color: white;
    }
    .rbc-agenda-date-cell.future {
      color: #a1a1aa;
    }
    .rbc-agenda-time-cell.future {
      color: #a1a1aa;
    }
    .rbc-time-view {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-time-header {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-time-header-content {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-time-gutter {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-time-slot {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-timeslot-group {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-month-view {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-month-row {
      border-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-month-row + .rbc-month-row {
      border-top-color: rgba(42, 42, 42, 0.5);
    }
    .rbc-day-bg + .rbc-day-bg {
      border-left-color: rgba(42, 42, 42, 0.5);
    }
  }
`

export default function OwnerReleasesPage() {
  const { data: units } = useListMyUnits()
  const [selectedRelease, setSelectedRelease] = useState<any>(null)
  const [isNewReleaseModalOpen, setIsNewReleaseModalOpen] = useState(false)
  const [isEditReleaseModalOpen, setIsEditReleaseModalOpen] = useState(false)
  const [isLateExitModalOpen, setIsLateExitModalOpen] = useState(false)
  const [isLateExitApprovalModalOpen, setIsLateExitApprovalModalOpen] = useState(false)
  const [isLateExitNotificationModalOpen, setIsLateExitNotificationModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [propertyId, setPropertyId] = useState<string>('')
  const { data: releases, refetch: refetchReleases } = useListMyReleasesByPeriod({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'yyyy-MM-dd'),
    propertyId
  })
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>('month')

  useEffect(() => {
    setIsClient(true)
    const id = readCookie('propertyId') || ''
    setPropertyId(id)
  }, [])

  const handleSuccess = () => {
    refetchReleases()
    setIsNewReleaseModalOpen(false)
    setIsEditReleaseModalOpen(false)
    setIsLateExitModalOpen(false)
    setIsLateExitApprovalModalOpen(false)
    setIsLateExitNotificationModalOpen(false)
  }

  const handleEventClick = (event: any) => {
    const release = event.release
    setSelectedRelease(release)

    // Check if the release has been checked in
    const canBeRemoved = release.status === 'PENDING' // Only allow removal if status is PENDING (not checked in yet)

    // Show the edit modal with the release data
    setIsEditReleaseModalOpen(true)
  }

  // Assign resource color based on release type or status
  const events = releases?.map((release: any) => {
    let resource: 'blue' | 'orange' | 'green' = 'blue';
    if (release.releaseType === 'DELIVERY') resource = 'green';
    else if (release.releaseType === 'SERVICEPROVIDER') resource = 'orange';
    else if (release.releaseType === 'GUEST' || release.releaseType === 'FAMILY' || release.releaseType === 'DRIVER') resource = 'blue';
    
    // Parse dates with timezone handling
    const startDate = new Date(release.validFrom);
    const endDate = new Date(release.validUntil);
    
    // Create dates in local timezone
    const start = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000);
    // For end date, we need to add one day to show it on the calendar
    const end = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000 + 24 * 60 * 60 * 1000);
    
    console.log('Release dates:', {
      id: release.id,
      originalStart: release.validFrom,
      originalEnd: release.validUntil,
      adjustedStart: start.toISOString(),
      adjustedEnd: end.toISOString()
    });
    
    return {
      id: release.id,
      title: `${release.visitorName || 'Visitante'} (${release.releaseType || 'N/A'})`,
      desc: `Documento: ${release.visitorDocument || 'N/A'}`,
      start,
      end,
      resource,
      release,
    }
  }) || [];

  // Use the resource property for event color
  const eventPropGetter = (event: any) => {
    return {
      className: `bg-${event.resource} text-white text-sm py-0.5`,
      style: {
        borderRadius: '0.5rem',
        padding: '0.25rem',
        margin: '0.125rem',
        cursor: 'pointer',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    };
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Inject calendar styles for light/dark mode */}
      <style>{calendarStyles}</style>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Liberações de Visitantes</h1>
          {!propertyId && (
            <p className="text-sm text-yellow-600 mt-1">
              Você precisa ter uma unidade associada para gerenciar liberações
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setIsNewReleaseModalOpen(true)}
            disabled={!propertyId}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Liberação
          </Button>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)', width: '100%' }}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventPropGetter}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          date: "Data",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Não há eventos neste período"
        }}
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleViewChange}
        views={['month', 'week', 'day', 'agenda']}
      />

      {isNewReleaseModalOpen && (
        <Dialog open={isNewReleaseModalOpen} onOpenChange={setIsNewReleaseModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Liberação</DialogTitle>
            </DialogHeader>
            <ReleaseStepForm propertyId={propertyId} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      )}

      {isEditReleaseModalOpen && selectedRelease && (
        <Dialog open={isEditReleaseModalOpen} onOpenChange={setIsEditReleaseModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Liberação</DialogTitle>
            </DialogHeader>
            <UpdateReleaseForm release={selectedRelease} propertyId={propertyId} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      )}

      {isLateExitModalOpen && selectedRelease && (
        <Dialog open={isLateExitModalOpen} onOpenChange={setIsLateExitModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Saída Tardia</DialogTitle>
            </DialogHeader>
            <LateExitApproval release={selectedRelease} onSuccess={handleSuccess} onCancel={() => setIsLateExitModalOpen(false)} />
          </DialogContent>
        </Dialog>
      )}

      {isLateExitApprovalModalOpen && selectedRelease && (
        <Dialog open={isLateExitApprovalModalOpen} onOpenChange={setIsLateExitApprovalModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aprovação de Saída Tardia</DialogTitle>
            </DialogHeader>
            <LateExitApproval release={selectedRelease} onSuccess={handleSuccess} onCancel={() => setIsLateExitApprovalModalOpen(false)} />
          </DialogContent>
        </Dialog>
      )}

      {isLateExitNotificationModalOpen && selectedRelease && (
        <Dialog open={isLateExitNotificationModalOpen} onOpenChange={setIsLateExitNotificationModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificação de Saída Tardia</DialogTitle>
            </DialogHeader>
            <LateExitNotification release={selectedRelease} onSuccess={handleSuccess} onCancel={() => setIsLateExitNotificationModalOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 