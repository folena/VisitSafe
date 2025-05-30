// UnitFormEdit.tsx
'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { UpdateUnitMutationRequest } from '@/api/models/UpdateUnit'
import { updateUnit } from '@/api/client/updateUnit'

type Props = {
  unit: {
    id: string
    block: string
    lot: string
    address: {
      street: string
      neighborhood: string
      city: string
      state: string
      zipCode: string
      complement?: string
    }
  } | null
  onSuccess: () => void
}

export function UnitFormEdit({ unit, onSuccess }: Props) {
  const [form, setForm] = useState<UpdateUnitMutationRequest>({
    id: '',
    block: '',
    lot: '',
    address: {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      complement: '',
    },
  })

  useEffect(() => {
    if (unit) {
      setForm({
        id: unit.id,
        block: unit.block,
        lot: unit.lot,
        address: {
          street: unit.address.street,
          neighborhood: unit.address.neighborhood,
          city: unit.address.city,
          state: unit.address.state,
          zipCode: unit.address.zipCode,
          complement: unit.address.complement ?? '',
        },
      })
    }
  }, [unit])

  const handleChange = (field: keyof UpdateUnitMutationRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field: keyof UpdateUnitMutationRequest['address'], value: string) => {
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (
      !form.block.trim() ||
      !form.lot.trim() ||
      !form.address.street.trim() ||
      !form.address.neighborhood.trim() ||
      !form.address.city.trim() ||
      !form.address.state.trim() ||
      !form.address.zipCode.trim()
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    try {
      await updateUnit(form)
      onSuccess()
    } catch (err) {
      console.error('Erro ao editar unidade:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Bloco</Label>
          <Input value={form.block} onChange={(e) => handleChange('block', e.target.value)} required />
        </div>
        <div>
          <Label>Lote</Label>
          <Input value={form.lot} onChange={(e) => handleChange('lot', e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Rua</Label>
          <Input value={form.address.street} onChange={(e) => handleAddressChange('street', e.target.value)} required />
        </div>
        <div>
          <Label>Bairro</Label>
          <Input value={form.address.neighborhood} onChange={(e) => handleAddressChange('neighborhood', e.target.value)} required />
        </div>
        <div>
          <Label>Cidade</Label>
          <Input value={form.address.city} onChange={(e) => handleAddressChange('city', e.target.value)} required />
        </div>
        <div>
          <Label>Estado</Label>
          <Input value={form.address.state} onChange={(e) => handleAddressChange('state', e.target.value)} required />
        </div>
        <div>
          <Label>CEP</Label>
          <Input value={form.address.zipCode} onChange={(e) => handleAddressChange('zipCode', e.target.value)} required />
        </div>
        <div>
          <Label>Complemento</Label>
          <Input value={form.address.complement} onChange={(e) => handleAddressChange('complement', e.target.value)} />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Salvar Alterações
      </Button>
    </form>
  )
}
