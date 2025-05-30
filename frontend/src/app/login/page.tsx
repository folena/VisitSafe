'use client'

import { useEffect } from 'react'
import { LoginForm } from '@/components/login-form'
import Image from 'next/image'

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
}

export default function Page() {
  useEffect(() => {
    const handleLogout = () => {
      clearCookie('token')
      clearCookie('role')
      clearCookie('email')
      clearCookie('propertyId')

      const theme = localStorage.getItem('theme')
      localStorage.clear()
      if (theme) {
        localStorage.setItem('theme', theme)
      }
    }

    handleLogout()
  }, [])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="VisitSafe Logo" width={200} height={40} />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
