"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-separator'
import { Phone, ArrowRight, Facebook, Instagram, Linkedin, Plus, Trash2, Edit2 } from 'lucide-react'
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import Hotjar from '@hotjar/browser'

// Setup the localizer for the calendar
const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  resource: 'blue' | 'orange' | 'green';
}

// Mock data for the calendar
const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Limpeza - Maria Silva',
    description: 'Limpeza semanal',
    start: new Date(new Date().setHours(9, 0, 0, 0)),
    end: new Date(new Date().setHours(12, 0, 0, 0)),
    resource: 'blue'
  },
  {
    id: '2',
    title: 'Manutenção - João Santos',
    description: 'Manutenção do ar condicionado',
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(16, 0, 0, 0)),
    resource: 'orange'
  },
  {
    id: '3',
    title: 'Entrega - Amazon',
    description: 'Entrega de pacote',
    start: new Date(new Date().setHours(10, 30, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0, 0)),
    resource: 'green'
  }
]

// Add custom styles for dark mode
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
    border-color: rgba(226, 232, 240, 0.3);
  }
  
  .rbc-timeslot-group {
    border-color: rgba(226, 232, 240, 0.3);
  }
  
  .rbc-time-header-content {
    border-color: rgba(226, 232, 240, 0.3);
  }
  
  .rbc-time-content {
    border-color: rgba(226, 232, 240, 0.3);
  }
  
  .rbc-time-header {
    border-color: rgba(226, 232, 240, 0.3);
  }
  
  .rbc-time-gutter {
    border-color: rgba(226, 232, 240, 0.3);
  }
  
  .rbc-time-slot {
    border-color: rgba(226, 232, 240, 0.3);
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
    border-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-month-row {
    border-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-month-row + .rbc-month-row {
    border-top-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-day-bg + .rbc-day-bg {
    border-left-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-day-slot .rbc-time-slot {
    border-top-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-time-header-gutter {
    border-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-time-content > * + * > * {
    border-left-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-agenda-view table.rbc-agenda-table {
    border-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
    border-color: rgba(226, 232, 240, 0.3);
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    border-color: rgba(226, 232, 240, 0.3);
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

  /* Light mode specific styles */
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

  /* Dark mode specific styles */
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

export default function ServicePage() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>('month')
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
    title: '',
    description: '',
    start: new Date(),
    end: new Date(),
    resource: 'blue'
  })

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ ...newEvent, start, end })
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setNewEvent(event)
    setIsModalOpen(true)
  }

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...newEvent, id: event.id } : event
      ))
    } else {
      setEvents([...events, { ...newEvent, id: Date.now().toString() }])
    }
    setIsModalOpen(false)
    setSelectedEvent(null)
    setNewEvent({
      title: '',
      description: '',
      start: new Date(),
      end: new Date(),
      resource: 'blue'
    })
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id))
      setIsModalOpen(false)
      setSelectedEvent(null)
    }
  }

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
  }

  useEffect(() => {
    const siteId = 6419047
    const hotjarVersion = 6

    // if (typeof window !== 'undefined') {
    //   Hotjar.init(siteId, hotjarVersion)
    // }
  }, [])
  return (
    <div className="flex flex-col min-h-screen scroll-smooth font-sans">
      <style>{calendarStyles}</style>
      <header className="fixed top-0 w-full h-[116px] bg-background/80 backdrop-blur-sm border-b border-border shadow-sm z-50">
        <div className="container mx-auto h-full px-4">
          <div className="w-full h-full grid grid-cols-4">
            {/* Coluna 1: Logo */}
            <div className="flex items-center justify-start px-4 border-r border-border h-[116px]">
              <Image src="/logo.png" alt="VisitSafe Logo" width={120} height={40} />
            </div>

            {/* Coluna 2: Home / Serviços */}
            <div className="flex flex-col text-sm font-medium text-center border-r border-border h-[116px]">
              <a
                href="#home"
                className="h-[58px] flex items-center justify-center w-full text-foreground hover:text-primary transition-colors"
              >
                Home
              </a>
              <div className="border-t w-full border-border" />
              <a
                href="#services"
                className="h-[58px] flex items-center justify-center w-full text-foreground hover:text-primary transition-colors"
              >
                Serviços
              </a>
            </div>

            {/* Coluna 3: Acessar Conta / Criar Conta */}
            <div className="flex flex-col text-sm font-medium text-center border-r border-border h-[116px]">
              <Link
                href="/login"
                className="h-[58px] flex items-center justify-center w-full text-foreground hover:text-primary transition-colors"
              >
                Acessar Conta
              </Link>
              <div className="border-t w-full border-border" />
              <Link
                href="/register"
                className="h-[58px] flex items-center justify-center w-full text-foreground hover:text-primary transition-colors"
              >
                Criar Conta
              </Link>
            </div>

            {/* Coluna 4: Contatar (estilizado) */}
            <a
              href="#contact"
              className="flex items-center justify-center text-sm font-medium text-center w-full h-[116px] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-colors"
            >
              <Phone size={16} className="mr-2" />
              Contatar
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div id="home" className="pt-[116px] bg-background">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-[30px] px-4">
          {/* Imagem vertical - escondida no mobile */}
          <div className="hidden md:block mt-[100px] w-full max-w-[370px] max-h-[520px] lg:max-w-[420px] lg:max-h-[580px]">
            <Image
              src="/Frame 6.png"
              alt="Imagem Vertical"
              width={420}
              height={580}
              className="rounded-xl object-cover w-full h-auto shadow-lg"
            />
          </div>

          {/* Imagem horizontal - visível sempre */}
          <div className="mt-[240px] w-full max-w-[770px] max-h-[466px] lg:max-w-[850px] lg:max-h-[500px] mx-auto md:mx-0">
            <Image
              src="/Frame 7.png"
              alt="Imagem Horizontal"
              width={850}
              height={500}
              className="rounded-xl object-cover w-full h-auto shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="w-full bg-background">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-left text-foreground">NOSSO SERVIÇO</h1>

          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-card hover:bg-accent/50 transition-colors border border-border">
              <h2 className="text-lg font-semibold text-card-foreground">CONTROLE DE ACESSOS</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Gerencie as entradas do seu condomínio com segurança e eficiência. Nosso sistema permite autorizações personalizadas, notificações em tempo real e histórico completo de acessos para maior tranquilidade de moradores e administradores.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card hover:bg-accent/50 transition-colors border border-border">
              <h2 className="text-lg font-semibold text-card-foreground">FACILIDADE NO AGENDAMENTO</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Agende liberações de visitantes com poucos toques. Moradores têm total autonomia para permitir acessos, enquanto a portaria conta com um sistema integrado para verificar e validar as entradas com rapidez.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card hover:bg-accent/50 transition-colors border border-border">
              <h2 className="text-lg font-semibold text-card-foreground">SEGURANÇA NA PORTARIA</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Apoie sua equipe com uma ferramenta que simplifica e fortalece o controle na portaria. Com registros digitais, alertas automáticos e integração com dispositivos de acesso, garantimos mais segurança com menos burocracia.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card hover:bg-accent/50 transition-colors border border-border">
              <h2 className="text-lg font-semibold text-card-foreground">RELATÓRIOS E MONITORAMENTO</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Acompanhe tudo o que acontece no seu condomínio com relatórios detalhados de acessos. Identifique padrões, receba alertas e tenha mais transparência na gestão da segurança condominial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="w-full bg-background">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-8 text-left text-foreground">COMO FUNCIONA</h1>
          
          <div className="flex flex-col gap-8">
            {/* Calendar Section - Full Width */}
            <div className="bg-card rounded-lg p-6 border border-border w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-card-foreground">Agenda de Acessos</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Evento
                </Button>
              </div>
              <div className="h-[500px] w-full">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%', width: '100%' }}
                  date={date}
                  onNavigate={handleNavigate}
                  view={view}
                  onView={handleViewChange}
                  views={['month', 'week', 'day', 'agenda']}
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
                  eventPropGetter={(event) => ({
                    className: `bg-${event.resource} text-white text-sm py-0.5`
                  })}
                  onSelectSlot={handleSelect}
                  onSelectEvent={handleEventClick}
                  selectable
                  className="dark:bg-card dark:text-card-foreground"
                />
              </div>
            </div>

            {/* Explanation Cards - Full Width */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">1. Agendamento Simples</h3>
                <p className="text-muted-foreground">
                  Moradores podem agendar visitas e serviços com poucos cliques, definindo horários específicos para cada acesso.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">2. Controle em Tempo Real</h3>
                <p className="text-muted-foreground">
                  Acompanhe todos os acessos em tempo real através do calendário, com notificações instantâneas de chegadas e saídas.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">3. Segurança Garantida</h3>
                <p className="text-muted-foreground">
                  Cada acesso é registrado e documentado, mantendo um histórico completo de todas as entradas e saídas do condomínio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'Editar Evento' : 'Novo Evento'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={newEvent.resource}
                onValueChange={(value: 'blue' | 'orange' | 'green') => setNewEvent({ ...newEvent, resource: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Limpeza</SelectItem>
                  <SelectItem value="orange">Manutenção</SelectItem>
                  <SelectItem value="green">Entrega</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {selectedEvent && (
              <Button variant="destructive" onClick={handleDeleteEvent}>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEvent}>
                <Edit2 className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Section / Footer */}
      <footer id="contact" className="w-full bg-[#1a1a1a] text-white pt-20" style={{ height: '482px' }}>
        {/* Texto central */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <p className="text-lg mb-6">
            Obrigado por escolher o VisitSafe para a gestão de acessos do seu condomínio. Estamos à disposição para ajudar você a garantir mais segurança e praticidade no seu dia a dia.
          </p>

          {/* Botão centralizado */}
          <a
            href="https://forms.gle/qhM7EHuEV1iMZT937"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center mx-auto bg-white text-[#1a1a1a] w-[270px] h-[60px] rounded-md hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold mr-2">Contatar</span>
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Logo + redes sociais */}
        <div className="container mx-auto flex justify-between items-center mt-[100px] px-4">
          {/* Logo branca */}
          <div>
            <Image src="/logo-white.png" alt="VisitSafe Logo White" width={120} height={40} />
          </div>

          {/* Redes sociais */}
          <div className="flex gap-6">
            <a href="#" aria-label="Facebook" className="hover:text-gray-300 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-300 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-300 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Linha separadora + direitos */}
        <div className="mt-[20px] border-t border-white/20 w-full" />
        <div className="text-center text-xs mt-[20px] mb-[20px] text-white/80">© 2025. All rights reserved</div>
      </footer>


    </div>
  )
}