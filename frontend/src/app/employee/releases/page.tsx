"use client"

import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useGetAllPendingToday } from '@/api/hooks/useGetAllPendingToday'
import { useGetAllCheckedInToday } from '@/api/hooks/useGetAllCheckedInToday'
import { useGetAllCanceledToday } from '@/api/hooks/useGetAllCanceledToday'
import { useGetAllCheckedOutToday } from '@/api/hooks/useGetAllCheckedOutToday'
import { useCheckinRelease } from '@/api/hooks/useCheckinRelease'
import { useCheckoutRelease } from '@/api/hooks/useCheckoutRelease'
import { useCancelRelease } from '@/api/hooks/useCancelRelease'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import LateExitForm from '@/components/late-exit-form'

function ReleaseTable({ releases, actions }: { releases: any[], actions: (release: any) => React.ReactNode }) {
  if (!releases?.length) return <div className="p-4 text-center text-muted-foreground">Nenhuma liberação encontrada.</div>
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Visitante</th>
          <th className="px-4 py-2 text-left">Documento</th>
          <th className="px-4 py-2 text-left">Tipo</th>
          <th className="px-4 py-2 text-left">Data</th>
          <th className="px-4 py-2 text-left">Horário de Entrada</th>
          <th className="px-4 py-2 text-left">Horário de Saída</th>
          <th className="px-4 py-2 text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        {releases.map((release) => {
          // Adjust date for timezone
          const date = new Date(release.validFrom);
          const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
          
          return (
            <tr key={release.id} className="border-b">
              <td className="px-4 py-2">{release.visitorName}</td>
              <td className="px-4 py-2">{release.visitorDocument}</td>
              <td className="px-4 py-2">{release.releaseType}</td>
              <td className="px-4 py-2">{adjustedDate.toLocaleDateString('pt-BR')}</td>
              <td className="px-4 py-2">{release.dailyStart}</td>
              <td className="px-4 py-2">{release.dailyEnd}</td>
              <td className="px-4 py-2">{actions(release)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default function EmployeeReleasesPage() {
  const [tab, setTab] = useState('pending')
  const [selectedRelease, setSelectedRelease] = useState<any>(null)
  const [showLateExitModal, setShowLateExitModal] = useState(false)
  const pending = useGetAllPendingToday()
  const checkedIn = useGetAllCheckedInToday()
  const canceled = useGetAllCanceledToday()
  const completed = useGetAllCheckedOutToday()
  const checkin = useCheckinRelease({
    mutation: {
      onSuccess: () => {
        pending.refetch()
        checkedIn.refetch()
        canceled.refetch()
      }
    }
  })
  const checkout = useCheckoutRelease({
    mutation: {
      onSuccess: () => {
        checkedIn.refetch()
        setShowLateExitModal(false)
      }
    }
  })
  const cancel = useCancelRelease({
    mutation: {
      onSuccess: () => {
        pending.refetch()
        checkedIn.refetch()
        canceled.refetch()
      }
    }
  })

  const handleCheckout = (release: any) => {
    if (release.releaseType === 'SERVICEPROVIDER') {
      // Parse the dailyEnd time
      const [hours, minutes] = release.dailyEnd.split(':')
      const dailyEnd = new Date()
      dailyEnd.setHours(parseInt(hours), parseInt(minutes), 0, 0)

      // Check if current time is after dailyEnd
      if (new Date() > dailyEnd) {
        setSelectedRelease(release)
        setShowLateExitModal(true)
        return
      }
    }
    
    // If not a late exit, proceed with normal checkout
    checkout.mutate({ id: release.id })
  }

  // Sort by nearest validFrom time
  const sortByNearest = (arr: any[] = []) =>
    arr.slice().sort((a, b) => new Date(a.validFrom).getTime() - new Date(b.validFrom).getTime())

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Liberações de Visitantes</h1>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="pending">Aguardando Check-in</TabsTrigger>
          <TabsTrigger value="checkedin">Aguardando Check-out</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <ReleaseTable
            releases={sortByNearest(pending.data?.content)}
            actions={(release) => (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => checkin.mutate({ id: release.id })} disabled={checkin.isPending}>Check-in</Button>
                <Button size="sm" variant="destructive" onClick={() => cancel.mutate({ id: release.id })} disabled={cancel.isPending}>Cancelar</Button>
              </div>
            )}
          />
        </TabsContent>
        <TabsContent value="checkedin">
          <ReleaseTable
            releases={sortByNearest(checkedIn.data?.content)}
            actions={(release) => (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleCheckout(release)} disabled={checkout.isPending}>Check-out</Button>
                <Button size="sm" variant="destructive" onClick={() => cancel.mutate({ id: release.id })} disabled={cancel.isPending}>Cancelar</Button>
              </div>
            )}
          />
        </TabsContent>
        <TabsContent value="completed">
          <ReleaseTable
            releases={sortByNearest(completed.data?.content)}
            actions={() => <span className="text-muted-foreground">-</span>}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <ReleaseTable
            releases={sortByNearest(canceled.data?.content)}
            actions={() => <span className="text-muted-foreground">-</span>}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={showLateExitModal} onOpenChange={setShowLateExitModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Justificativa de Saída Tardia</DialogTitle>
          </DialogHeader>
          {selectedRelease && (
            <LateExitForm
              release={selectedRelease}
              onSuccess={() => {
                setShowLateExitModal(false)
                setSelectedRelease(null)
              }}
              onCancel={() => {
                setShowLateExitModal(false)
                setSelectedRelease(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 