'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Mensagem de boas-vindas */}
      <h1 className="text-3xl font-bold">Bem-vindo de volta!</h1>

      {/* Banner com texto centralizado */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src="/chalo-garcia-PgQgOQ5VhJ0-unsplash.jpg"
          alt="Banner de boas-vindas"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-white text-5xl font-extrabold">Visit Safe</h2>
        </div>
      </div>

      {/* Conteúdo abaixo do banner */}
      <h2 className="text-2xl font-semibold">Resumo rápido</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium">Liberações hoje</h3>
            <p className="text-muted-foreground text-sm mt-2">3 visitantes previstos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium">Última visita</h3>
            <p className="text-muted-foreground text-sm mt-2">Maria Oliveira às 14:30</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium">Total no mês</h3>
            <p className="text-muted-foreground text-sm mt-2">28 liberações realizadas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
