import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface Props {
  release: any
  onSuccess: () => void
  onCancel: () => void
}

export default function LateExitNotification({ release, onSuccess, onCancel }: Props) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleNotify = async () => {
    if (!message) return

    setIsSubmitting(true)
    try {
      // Here you would implement the actual notification logic
      // For example, sending an email or SMS to the resident
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      
      toast({
        title: "Notificação enviada",
        description: "O morador foi notificado sobre a saída tardia.",
      })
      
      onSuccess()
    } catch (error) {
      toast({
        title: "Erro ao enviar notificação",
        description: "Não foi possível notificar o morador. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Notificar Morador</h3>
        <p className="text-sm text-gray-500">
          Um prestador de serviço solicitou permissão para sair após o horário permitido.
          Por favor, notifique o morador sobre esta solicitação.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Mensagem para o Morador</Label>
        <Textarea
          placeholder="Digite a mensagem que será enviada ao morador..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
          onClick={handleNotify}
          disabled={!message || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Enviando...' : 'Notificar Morador'}
        </Button>
      </div>
    </div>
  )
} 