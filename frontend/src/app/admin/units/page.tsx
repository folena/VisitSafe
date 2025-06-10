'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { UnitTable } from '@/components/unit-table'

export default function AdminUnitsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Unidades</h1>
          <UnitTable />
    </div>
  )
}
