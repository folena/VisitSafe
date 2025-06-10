import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRecordExit1 } from '@/api/hooks/useRecordExit1'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  release: any
  onSuccess: () => void
  onCancel: () => void
}

export default function LateExitForm({ release, onSuccess, onCancel }: Props) {
  const [justification, setJustification] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const recordExitMutation = useRecordExit1({
    mutation: {
      onSuccess: () => {
        setIsSubmitting(false)
        queryClient.invalidateQueries({ queryKey: ['getServiceProviderRelease', release.id] })
        toast({
          title: "Saída registrada",
          description: "A saída foi registrada com sucesso.",
        })
        onSuccess()
      },
      onError: () => {
        setIsSubmitting(false)
        toast({
          title: "Erro ao registrar saída",
          description: "Não foi possível registrar a saída. Tente novamente.",
          variant: "destructive",
        })
      }
    }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Tipo de arquivo inválido",
          description: "Por favor, selecione apenas imagens.",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!justification.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, forneça uma justificativa.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      let imageData: string | undefined
      let imageType: string | undefined

      if (file) {
        // Convert file to base64
        const reader = new FileReader()
        imageData = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
        imageType = file.type
      }

      await recordExitMutation.mutateAsync({
        id: release.id,
        data: {
          justification,
          imageData,
          imageType
        }
      })
    } catch (error) {
      console.error('Error submitting justification:', error)
      toast({
        title: "Erro",
        description: "Erro ao enviar justificativa. Por favor, tente novamente.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Saída Tardia</h3>
        <p className="text-sm text-gray-500">
          Por favor, forneça uma justificativa detalhada e um documento assinado explicando o motivo da saída após o horário permitido.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Justificativa</Label>
        <Textarea
          placeholder="Descreva o motivo da saída tardia..."
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Documento Assinado (Imagem)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex-1"
          />
          {file && (
            <span className="text-sm text-gray-500">
              {file.name}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Apenas imagens são aceitas (JPG, PNG, etc.)
        </p>
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
          onClick={handleSubmit}
          disabled={!justification || !file || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Justificativa'}
        </Button>
      </div>
    </div>
  )
} 