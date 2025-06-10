'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { activateUnitAssociationCode } from '@/api/client/activateUnitAssociationCode'

export function UnitAssociationForm({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleActivate = async () => {
    try {
      setLoading(true)
      setError(null)

      await activateUnitAssociationCode({ code })

      onSuccess()
    } catch (e) {
      setError('Código inválido ou expirado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Cole o código de associação aqui"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button onClick={handleActivate} disabled={loading || !code}>
        {loading ? 'Ativando...' : 'Ativar'}
      </Button>
    </div>
  )
}
