'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Eye, EyeOff, Copy } from 'lucide-react'
import { Input } from './ui/input'
import { generateUnitAssociationCode } from '@/api/client/generateUnitAssociationCode'
import type { GenerateUnitAssociationCodeQueryResponse } from '@/api/models/GenerateUnitAssociationCode'

type Props = {
  unitId: string
  unitType: 'residential' | 'enterprise'
}

export function GenerateAssociationCodeButton({ unitId, unitType }: Props) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCode = async () => {
    try {
      setError(null)
      const data: GenerateUnitAssociationCodeQueryResponse = await generateUnitAssociationCode(unitId, { params: { type: unitType } })
      setCode(data.code)
      setExpiresAt(new Date(data.expiresAt))
      setVisible(false)
      setCopied(false)
    } catch (err) {
      console.error(err)
      setError('Não foi possível gerar o código. Tente novamente.')
    }
  }

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatRemainingTime = () => {
    if (!expiresAt) return ''
    const diff = Math.max(expiresAt.getTime() - Date.now(), 0)
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    return `${hours}h ${minutes}min restantes`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={fetchCode}>Gerar código de associação</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Código de associação</DialogTitle>
        </DialogHeader>

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex items-center space-x-2 mt-4">
              <Input
                type={visible ? 'text' : 'password'}
                value={code || ''}
                readOnly
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={() => setVisible(!visible)}>
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-1" />
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
            {expiresAt && (
              <p className="text-sm text-muted-foreground mt-2">
                Código válido por 24 horas. {formatRemainingTime()}
              </p>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
