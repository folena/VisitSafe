'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  existsByDocumentAndTypeQueryParamsTypeEnum as T,
  ExistsByDocumentAndTypeQueryParamsTypeEnum as Type,
} from '@/api/models/ExistsByDocumentAndType'

import { useUpdateDeliveryRelease } from '@/api/hooks/useUpdateDeliveryRelease'
import { useUpdateDriverRelease } from '@/api/hooks/useUpdateDriverRelease'
import { useUpdateFamilyRelease } from '@/api/hooks/useUpdateFamilyRelease'
import { useUpdateGuestRelease } from '@/api/hooks/useUpdateGuestRelease'
import { useUpdateServiceProviderRelease } from '@/api/hooks/useUpdateServiceProviderRelease'

import { useDeleteDeliveryRelease } from '@/api/hooks/useDeleteDeliveryRelease'
import { useDeleteDriverRelease } from '@/api/hooks/useDeleteDriverRelease'
import { useDeleteFamilyRelease } from '@/api/hooks/useDeleteFamilyRelease'
import { useDeleteGuestRelease } from '@/api/hooks/useDeleteGuestRelease'
import { useDeleteServiceProviderRelease } from '@/api/hooks/useDeleteServiceProviderRelease'

interface Props {
  release: any
  propertyId: string
  onSuccess: () => void
}

// Helper function to convert ISO string to local date format
function isoToLocalDate(isoString: string): string {
  if (!isoString) return ''
  // Create date in local timezone
  const date = new Date(isoString)
  // Adjust for timezone offset to get the correct local date
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
  const year = localDate.getFullYear()
  const month = String(localDate.getMonth() + 1).padStart(2, '0')
  const day = String(localDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Helper function to convert ISO string to local time format
function isoToLocalTime(isoString: string): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// Helper function to convert time string to HH:mm format
function formatTime(timeStr: string): string {
  if (!timeStr) return ''
  // If the time is already in HH:mm format, return it
  if (timeStr.length === 5) return timeStr
  // If the time is in HH:mm:ss format, remove the seconds
  if (timeStr.length === 8) return timeStr.substring(0, 5)
  // If the time is in ISO format, convert it
  try {
    const date = new Date(timeStr)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  } catch {
    return ''
  }
}

// Helper function to convert time string to LocalTime format expected by Spring Boot
function formatTimeForBackend(timeStr: string): string {
  if (!timeStr) return ''
  // Spring Boot expects LocalTime in format "HH:mm:ss"
  return timeStr.length === 5 ? `${timeStr}:00` : timeStr
}

// Helper function to convert local date to ISO
function localDateToIso(localDate: string): string {
  if (!localDate) return ''
  // Return date in YYYY-MM-DD format
  return localDate
}

// Helper function to create LocalTime object from time input
function createLocalTime(timeStr: string): { hour: number; minute: number; second: number; nano: number } {
  if (!timeStr) return { hour: 0, minute: 0, second: 0, nano: 0 }
  const [hours, minutes] = timeStr.split(':').map(Number)
  return {
    hour: hours,
    minute: minutes,
    second: 0,
    nano: 0
  }
}

// Helper function to create LocalDate string from date input
function createLocalDate(dateStr: string): string {
  if (!dateStr) return ''
  return dateStr
}

// Helper function to create ISO datetime from date and time
function createIsoFromDateAndTime(dateStr: string, timeStr: string): string {
  if (!dateStr || !timeStr) return ''
  // Create date in local timezone
  const date = new Date(`${dateStr}T${timeStr}:00`)
  // Adjust for timezone offset to get the correct UTC date
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return utcDate.toISOString()
}

export default function UpdateReleaseForm({ release, propertyId, onSuccess }: Props) {
  // Initialize state with properly converted values
  const [validFrom, setValidFrom] = useState(isoToLocalDate(release.validFrom))
  const [validUntil, setValidUntil] = useState(isoToLocalDate(release.validUntil))
  const [dailyStart, setDailyStart] = useState(formatTime(release.dailyStart))
  const [dailyEnd, setDailyEnd] = useState(formatTime(release.dailyEnd))

  console.log('Initial dailyStart:', release.dailyStart, 'Formatted:', formatTime(release.dailyStart))
  console.log('Initial dailyEnd:', release.dailyEnd, 'Formatted:', formatTime(release.dailyEnd))

  const type: Type = release.releaseType

  const updateMutation = (() => {
    switch (type) {
      case T.DELIVERY: return useUpdateDeliveryRelease
      case T.DRIVER: return useUpdateDriverRelease
      case T.FAMILY: return useUpdateFamilyRelease
      case T.GUEST: return useUpdateGuestRelease
      case T.SERVICEPROVIDER: return useUpdateServiceProviderRelease
      default: throw new Error(`Tipo de liberação inválido: ${type}`)
    }
  })()({ mutation: { onSuccess } })

  const deleteMutation = (() => {
    switch (type) {
      case T.DELIVERY: return useDeleteDeliveryRelease
      case T.DRIVER: return useDeleteDriverRelease
      case T.FAMILY: return useDeleteFamilyRelease
      case T.GUEST: return useDeleteGuestRelease
      case T.SERVICEPROVIDER: return useDeleteServiceProviderRelease
      default: throw new Error(`Tipo de liberação inválido: ${type}`)
    }
  })()({ mutation: { onSuccess } })

  const isValid = () => {
    if (type === T.SERVICEPROVIDER) {
      // For service providers, ensure dailyEnd is after dailyStart
      const startTime = new Date(`2000-01-01T${dailyStart}`)
      const endTime = new Date(`2000-01-01T${dailyEnd}`)
      if (endTime <= startTime) {
        return false
      }
    }
    return validFrom && validUntil && dailyStart && dailyEnd
  }

  const handleSave = () => {
    if (!isValid()) return

    const payload = {
      unitId: propertyId,
      validFrom: validFrom, // Send as string in YYYY-MM-DD format
      validUntil: validUntil, // Send as string in YYYY-MM-DD format
      dailyStart: formatTimeForBackend(dailyStart), // Send as string in HH:mm:ss format
      dailyEnd: formatTimeForBackend(dailyEnd), // Send as string in HH:mm:ss format
    }

    console.log('Payload being sent:', payload) // Debug log

    updateMutation.mutate({
      id: release.id,
      data: {
        unitId: propertyId,
        validFrom: localDateToIso(validFrom),
        validUntil: localDateToIso(validUntil),
        dailyStart: createLocalTime(dailyStart),
        dailyEnd: createLocalTime(dailyEnd)
      }
    })
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta liberação?')) {
      deleteMutation.mutate({ id: release.id })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Editar horários da liberação ({type})</h2>
      <p className="text-sm text-muted-foreground">
        Atualize os horários de início e fim da liberação, bem como os horários diários permitidos.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="validFrom">Início da liberação</Label>
          <Input
            id="validFrom"
            type="date"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="validUntil">Fim da liberação</Label>
          <Input
            id="validUntil"
            type="date"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dailyStart">Horário diário de entrada</Label>
          <Input
            id="dailyStart"
            type="time"
            value={dailyStart}
            onChange={(e) => setDailyStart(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dailyEnd">Horário diário de saída</Label>
          <Input
            id="dailyEnd"
            type="time"
            value={dailyEnd}
            onChange={(e) => setDailyEnd(e.target.value)}
            required
          />
        </div>
      </div>

      {type === T.SERVICEPROVIDER && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-medium text-yellow-800">Regras para Prestadores de Serviço</h3>
          <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
            <li>O prestador só poderá entrar no horário permitido</li>
            <li>A saída deve ser feita dentro do horário estabelecido</li>
            <li>Em caso de necessidade de saída após o horário, será necessário justificativa e aprovação do morador</li>
          </ul>
        </div>
      )}

      <div className="flex justify-between">
        <Button 
          variant="destructive" 
          onClick={handleDelete}
        >
          Remover Liberação
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={onSuccess}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!isValid()}>
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Debug section - remove in production */}
      {/* <div className="mt-4 p-2 bg-gray-100 text-xs rounded">
        <strong>Debug Info:</strong><br/>
        Original dailyStart: {release.dailyStart}<br/>
        Parsed dailyStart: {dailyStart}<br/>
        Will send: {validFrom ? createIsoFromDateAndTime(validFrom.split('T')[0], dailyStart) : 'N/A'}
      </div> */}
    </div>
  )
}