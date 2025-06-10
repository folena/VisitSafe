'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useRecordEntry1 as useRecordEntry, useRecordExit1 as useRecordExit, useNotifyResident1 as useNotifyResident, useApproveLateExit1 as useApproveLateExit } from '@/api/hooks'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { useGetServiceProviderRelease } from '@/api/hooks/useGetServiceProviderRelease'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ServiceProviderRelease {
  id: string
  status: string
  dailyStart: string
  dailyEnd: string
  actualEntryTime?: string
  actualExitTime?: string
  lateExitJustification?: string
  residentNotified?: boolean
}

interface ServiceProviderAccessControlProps {
  id: string
  onSuccess?: () => void
}

export function ServiceProviderAccessControl({ id, onSuccess }: ServiceProviderAccessControlProps) {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [justification, setJustification] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { data: release, isLoading } = useGetServiceProviderRelease(id)
  const recordEntry = useRecordEntry()
  const recordExit = useRecordExit()
  const notifyResident = useNotifyResident()
  const approveLateExit = useApproveLateExit()

  const handleRecordEntry = async () => {
    try {
      await recordEntry.mutateAsync({ id })
      queryClient.invalidateQueries({ queryKey: ['getServiceProviderRelease', id] })
      onSuccess?.()
    } catch (error) {
      console.error('Error recording entry:', error)
    }
  }

  const handleRecordExit = async () => {
    try {
      let imageData: string | undefined
      let imageType: string | undefined

      if (file) {
        const reader = new FileReader()
        imageData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
        imageType = file.type
      }

      await recordExit.mutateAsync({
        id,
        data: {
          justification: justification,
          imageData,
          imageType
        }
      })
      queryClient.invalidateQueries({ queryKey: ['getServiceProviderRelease', id] })
      onSuccess?.()
    } catch (error) {
      console.error('Error recording exit:', error)
    }
  }

  const handleNotifyResident = async () => {
    try {
      await notifyResident.mutateAsync({ id })
      queryClient.invalidateQueries({ queryKey: ['getServiceProviderRelease', id] })
      onSuccess?.()
    } catch (error) {
      console.error('Error notifying resident:', error)
    }
  }

  const handleApproveLateExit = async (approved: boolean) => {
    try {
      await approveLateExit.mutateAsync({ 
        id, 
        params: { approve: approved }
      })
      queryClient.invalidateQueries({ queryKey: ['getServiceProviderRelease', id] })
      onSuccess?.()
    } catch (error) {
      console.error('Error approving late exit:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!release) {
    return <div>Release not found</div>
  }

  const typedRelease = {
    ...release,
    dailyStart: release.dailyStart.toString(),
    dailyEnd: release.dailyEnd.toString()
  } as ServiceProviderRelease

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Provider Access Control</CardTitle>
        <CardDescription>Manage service provider entry and exit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Scheduled Times</h3>
            <p>Entry: {format(new Date(typedRelease.dailyStart), 'HH:mm', { locale: ptBR })}</p>
            <p>Exit: {format(new Date(typedRelease.dailyEnd), 'HH:mm', { locale: ptBR })}</p>
          </div>

          {typedRelease.actualEntryTime && (
            <div>
              <h3 className="font-medium">Actual Entry Time</h3>
              <p>{format(new Date(typedRelease.actualEntryTime), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
            </div>
          )}

          {typedRelease.actualExitTime && (
            <div>
              <h3 className="font-medium">Actual Exit Time</h3>
              <p>{format(new Date(typedRelease.actualExitTime), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
            </div>
          )}

          {typedRelease.status === 'PENDING_CHECKIN' && (
            <Button onClick={handleRecordEntry} disabled={recordEntry.isPending}>
              Record Entry
            </Button>
          )}

          {typedRelease.status === 'CHECKED_IN' && (
            <div className="space-y-4">
              <Button onClick={handleRecordExit} disabled={recordExit.isPending}>
                Record Exit
              </Button>

              {new Date() > new Date(typedRelease.dailyEnd) && (
                <div className="space-y-2">
                  <h3 className="font-medium">Late Exit Justification</h3>
                  <textarea
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Please provide a justification for the late exit"
                  />
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}

          {typedRelease.status === 'PENDING_RESIDENT_APPROVAL' && (
            <div className="space-y-4">
              {!typedRelease.residentNotified && (
                <Button onClick={handleNotifyResident} disabled={notifyResident.isPending}>
                  Notify Resident
                </Button>
              )}

              {typedRelease.residentNotified && (
                <Alert>
                  <AlertTitle>Waiting for Resident Approval</AlertTitle>
                  <AlertDescription>
                    The resident has been notified about the late exit. Waiting for their response.
                  </AlertDescription>
                </Alert>
              )}

              {typedRelease.lateExitJustification && (
                <div>
                  <h3 className="font-medium">Late Exit Justification</h3>
                  <p>{typedRelease.lateExitJustification}</p>
                </div>
              )}
            </div>
          )}

          {typedRelease.status === 'PENDING_RESIDENT_APPROVAL' && typedRelease.residentNotified && (
            <div className="space-y-2">
              <h3 className="font-medium">Resident Approval</h3>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleApproveLateExit(true)}
                  disabled={approveLateExit.isPending}
                  variant="default"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleApproveLateExit(false)}
                  disabled={approveLateExit.isPending}
                  variant="destructive"
                >
                  Reject
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// TODO: Implement file upload function
async function uploadFile(file: File): Promise<string> {
  // Implement file upload logic here
  return ''
} 