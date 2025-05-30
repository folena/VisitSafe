'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { UnitCreateRequestDTO } from '@/api/models/UnitCreateRequestDTO'
import { useCreateUnit } from '@/api/hooks/useCreateUnit'

// Busca endereço com base no CEP via ViaCEP
async function fetchAddressByZipCode(zipCode: string) {
  const cleaned = zipCode.replace(/\D/g, '')
  if (cleaned.length !== 8) return null

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`)
    if (!res.ok) return null

    const data = await res.json()
    if (data.erro) return null

    return {
      street: data.logradouro || '',
      neighborhood: data.bairro || '',
      city: data.localidade || '',
      state: data.uf || '',
    }
  } catch (err) {
    console.error('Erro ao buscar endereço por CEP:', err)
    return null
  }
}

// Função de máscara de CEP: 99999-999
function formatZipCode(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length <= 5) return cleaned
  return cleaned.slice(0, 5) + '-' + cleaned.slice(5, 8)
}

export function UnitForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState<UnitCreateRequestDTO>({
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

  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const createUnit = useCreateUnit()

  const handleChange = (field: keyof UnitCreateRequestDTO, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field: keyof UnitCreateRequestDTO['address'], value: string) => {
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handleZipCodeChange = async (value: string) => {
    const masked = formatZipCode(value)
    handleAddressChange('zipCode', masked)

    const cleaned = masked.replace(/\D/g, '')
    if (cleaned.length === 8) {
      setIsLoadingCep(true)
      const address = await fetchAddressByZipCode(cleaned)
      setIsLoadingCep(false)

      if (address) {
        setForm((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            ...address,
            zipCode: masked,
          },
        }))
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      await createUnit.mutateAsync({ data: form })
      setForm({
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
      onSuccess?.()
      router.push('/admin/units')
    } catch (err) {
      setError('Erro ao criar unidade. Tente novamente.')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Bloco</Label>
          <Input value={form.block} onChange={(e) => handleChange('block', e.target.value)} />
        </div>
        <div>
          <Label>Lote</Label>
          <Input value={form.lot} onChange={(e) => handleChange('lot', e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>CEP</Label>
          <Input
            value={form.address.zipCode}
            onChange={(e) => handleZipCodeChange(e.target.value)}
            placeholder="00000-000"
            maxLength={9}
          />
          {isLoadingCep && <p className="text-sm text-gray-500">Buscando endereço...</p>}
        </div>

        <div>
          <Label>Complemento</Label>
          <Input
            value={form.address.complement}
            onChange={(e) => handleAddressChange('complement', e.target.value)}
          />
        </div>

        <div>
          <Label>Rua</Label>
          <Input
            value={form.address.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
          />
        </div>

        <div>
          <Label>Bairro</Label>
          <Input
            value={form.address.neighborhood}
            onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
          />
        </div>

        <div>
          <Label>Cidade</Label>
          <Input
            value={form.address.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
          />
        </div>

        <div>
          <Label>Estado</Label>
          <Input
            value={form.address.state}
            onChange={(e) => handleAddressChange('state', e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit">Criar Unidade</Button>
    </form>
  )
}