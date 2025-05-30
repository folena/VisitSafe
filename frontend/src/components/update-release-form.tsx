'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

export default function UpdateReleaseForm({ release, propertyId, onSuccess }: Props) {
  const [validFrom, setValidFrom] = useState(release.validFrom?.slice(0, 16) || '')
  const [validUntil, setValidUntil] = useState(release.validUntil?.slice(0, 16) || '')
  const [dailyStart, setDailyStart] = useState(release.dailyStart?.slice(11, 16) || '')
  const [dailyEnd, setDailyEnd] = useState(release.dailyEnd?.slice(11, 16) || '')

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

  const isValid = () => validFrom && validUntil && dailyStart && dailyEnd

  const handleSave = () => {
    if (!isValid()) return

    const toIso = (v: string) => new Date(v).toISOString()
    const datePart = validFrom.split('T')[0]
    const dailyStartIso = toIso(`${datePart}T${dailyStart}:00`)
    const dailyEndIso = toIso(`${datePart}T${dailyEnd}:00`)

    updateMutation.mutate({
      id: release.id,
      data: {
        unitId: propertyId,
        validFrom: toIso(validFrom),
        validUntil: toIso(validUntil),
        dailyStart: dailyStartIso,
        dailyEnd: dailyEndIso,
      },
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

      <label className="text-sm font-medium">Início da liberação</label>
      <Input type="datetime-local" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />

      <label className="text-sm font-medium">Fim da liberação</label>
      <Input type="datetime-local" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />

      <label className="text-sm font-medium">Horário diário de entrada</label>
      <Input type="time" value={dailyStart} onChange={(e) => setDailyStart(e.target.value)} />

      <label className="text-sm font-medium">Horário diário de saída</label>
      <Input type="time" value={dailyEnd} onChange={(e) => setDailyEnd(e.target.value)} />

      <div className="space-y-2">
        <Button className="w-full mt-4" onClick={handleSave}>
          Salvar alterações
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={handleDelete}
        >
          Excluir Liberação
        </Button>
      </div>
    </div>
  )
}
