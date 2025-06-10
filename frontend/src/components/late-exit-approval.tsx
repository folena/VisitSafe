import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useApproveServiceProviderRelease } from '@/api/hooks/useApproveServiceProviderRelease'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  release: any
  onSuccess: () => void
  onCancel: () => void
}

export default function LateExitApproval({ release, onSuccess, onCancel }: Props) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const approveMutation = useApproveServiceProviderRelease({
    mutation: {
      onSuccess: () => {
        setIsSubmitting(false)
        onSuccess()
      },
      onError: () => {
        setIsSubmitting(false)
      }
    }
  })

  const handleApprove = () => {
    setIsSubmitting(true)
    approveMutation.mutate({
      id: release.id,
      params: { approve: true }
    })
  }

  const handleReject = () => {
    if (!rejectionReason) return
    setIsSubmitting(true)
    approveMutation.mutate({
      id: release.id,
      params: { approve: false }
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Aprovação de Saída Tardia</h3>
        <p className="text-sm text-gray-500">
          Um prestador de serviço solicitou permissão para sair após o horário permitido.
          Por favor, revise a justificativa e o documento anexado.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Justificativa do Prestador</Label>
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm">{release.justification}</p>
        </div>
      </div>

      {release.justificationFile && (
        <div className="space-y-2">
          <Label>Documento Anexado</Label>
          <div className="p-3 bg-gray-50 rounded-md">
            <a
              href={release.justificationFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ver documento
            </a>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Motivo da Rejeição (opcional)</Label>
        <Textarea
          placeholder="Se você rejeitar, explique o motivo..."
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          variant="destructive"
          onClick={handleReject}
          disabled={isSubmitting}
          className="flex-1"
        >
          Rejeitar
        </Button>
        <Button
          onClick={handleApprove}
          disabled={isSubmitting}
          className="flex-1"
        >
          Aprovar
        </Button>
      </div>
    </div>
  )
} 