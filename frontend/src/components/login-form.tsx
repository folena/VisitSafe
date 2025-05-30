'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { login } from '@/api/client/login'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { LoginMutationRequest } from '@/api/models/Login'
import axios from 'axios'

export function LoginForm(
  { className, ...props }: React.ComponentPropsWithoutRef<'div'>
) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const setBrowserCookie = (key: string, value: string, maxAgeSec = 60 * 60 * 2) => {
    document.cookie = `${key}=${value}; path=/; max-age=${maxAgeSec}; SameSite=Lax`
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('E-mail e senha são obrigatórios')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const payload: LoginMutationRequest = { email, password }
      const res = await login(payload)

      if (!res.token || !res.role || !res.email) {
        throw new Error('Resposta inválida do servidor')
      }

      setBrowserCookie('token', res.token)
      setBrowserCookie('role', res.role)
      setBrowserCookie('email', res.email)

      router.push('/dashboard')
    } catch (err) {
      console.error('Erro no login:', err)
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('E-mail ou senha incorretos')
        } else if (err.response?.status === 429) {
          setError('Muitas tentativas. Tente novamente mais tarde')
        } else if (!err.response || err.code === 'ERR_NETWORK') {
          setError('Erro de conexão. Verifique sua internet')
        } else {
          setError(`Erro do servidor: ${err.response?.status || 'desconhecido'}`)
        }
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com seu e‑mail para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E‑mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
                autoComplete="email"
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-2 text-center text-sm text-red-500">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
            <p className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <a href="/register" className="underline underline-offset-4 hover:text-primary">
                Registre‑se
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
