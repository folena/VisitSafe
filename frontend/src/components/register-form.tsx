'use client'

import { useState, useCallback, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MaskedDocumentInput } from '@/components/wrapper/masked-document-input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

// ✅ Importações corrigidas diretamente do local certo
import type { EnterpriseOwnerUserCreateRequestDTO, EnterpriseOwnerUserCreateRequestDTODocumentTypeEnum } from '@/api/models/EnterpriseOwnerUserCreateRequestDTO'
import type { ResidentialOwnerUserCreateRequestDTO } from '@/api/models/ResidentialOwnerUserCreateRequestDTO'
import { createEnterpriseOwner } from '@/api/client/createEnterpriseOwner'
import { createResidentialOwner } from '@/api/client/createResidentialOwner'
import type { Account } from '@/api/models/Account'

type AccountType = 'cpf' | 'cnpj'

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [accountType, setAccountType] = useState<AccountType>('cpf')
  const [documentNumber, setDocumentNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAccountTypeChange = useCallback((value: string) => {
    setAccountType(value as AccountType)
    setDocumentNumber('')
  }, [])

  const handleDocumentChange = useCallback((val: string) => {
    setDocumentNumber(val)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const account: Account = {
      email,
      password,
      role: 'OWNER',
      active: true,
    }

    try {
      setLoading(true)

      if (accountType === 'cpf') {
        const payload: ResidentialOwnerUserCreateRequestDTO = {
          name,
          rawDocumentNumber: documentNumber,
          documentType: 'CPF',
          account,
          units: [],
        }
        await createResidentialOwner(payload)

      } else {
        const payload: EnterpriseOwnerUserCreateRequestDTO = {
          name,
          rawDocumentNumber: documentNumber,
          documentType: 'CNPJ' as EnterpriseOwnerUserCreateRequestDTODocumentTypeEnum,
          account,
          units: [],
        }
        await createEnterpriseOwner(payload)
      }

      router.push('/dashboard')
    } catch (err) {
      console.error('Erro ao registrar proprietário:', err)
      alert('Erro ao registrar. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registro</CardTitle>
          <CardDescription>
            Crie sua conta de proprietário com CPF ou CNPJ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <div className="grid gap-2">
              <Label>Tipo de Conta</Label>
              <Select onValueChange={handleAccountTypeChange} value={accountType}>
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF (Pessoa Física)</SelectItem>
                  <SelectItem value="cnpj">CNPJ (Pessoa Jurídica)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>{accountType === 'cpf' ? 'CPF' : 'CNPJ'}</Label>
              <MaskedDocumentInput
                accountType={accountType}
                value={documentNumber}
                onValueChange={handleDocumentChange}
                id="documentNumber"
                name="documentNumber"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar Conta'}
            </Button>
            <p className="text-center text-sm mt-2">
              Já tem uma conta?{' '}
              <a href="/login" className="underline">
                Faça login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
