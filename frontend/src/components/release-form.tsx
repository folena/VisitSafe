import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectLabel,
} from '@/components/ui/select'
import { MaskedDocumentInput } from '@/components/wrapper/masked-document-input'
import { useExistsByDocumentAndType } from '@/api/hooks/useExistsByDocumentAndType'
import {
  useCreateFamilyRelease,
  useCreateGuestRelease,
  useCreateDeliveryRelease,
  useCreateDriverRelease,
  useCreateServiceProviderRelease,
} from '@/api/hooks'
import {
  existsByDocumentAndTypeQueryParamsTypeEnum,
  ExistsByDocumentAndTypeQueryParamsTypeEnum,
} from '@/api/models/ExistsByDocumentAndType'
import { Label } from '@/components/ui/label'

interface Props {
  propertyId: string
  onSuccess: () => void
}

// Helper function to convert ISO string to local date format
function isoToLocalDate(isoString: string): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Helper function to convert ISO string to local time format
function isoToLocalTime(isoString: string): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// Helper function to convert time string to LocalTime format expected by Spring Boot
function formatTimeForBackend(timeStr: string): string {
  if (!timeStr) return ''
  // Spring Boot expects LocalTime in format "HH:mm:ss" or "HH:mm"
  return timeStr.length === 5 ? `${timeStr}:00` : timeStr
}

// Helper function to convert local date to ISO
function localDateToIso(localDate: string): string {
  if (!localDate) return ''
  return new Date(localDate).toISOString()
}

// Helper function to create LocalTime object from time input
function createLocalTime(timeStr: string): { hour: number; minute: number; second: number; nano: number } {
  if (!timeStr) return { hour: 0, minute: 0, second: 0, nano: 0 }
  const [hours, minutes] = timeStr.split(':').map(Number)
  return {
    hour: hours,
    minute: minutes,
    second: 0,
    nano: 0
  }
}

// Helper function to create LocalDate string from date input
function createLocalDate(dateStr: string): string {
  if (!dateStr) return ''
  return dateStr
}

// Helper function to create ISO datetime from date and time
function createIsoFromDateAndTime(dateStr: string, timeStr: string): string {
  if (!dateStr || !timeStr) return ''
  const date = new Date(`${dateStr}T${timeStr}:00`)
  return date.toISOString()
}

export default function ReleaseStepForm({ propertyId, onSuccess }: Props) {
  /* ----------------------------- Estados ---------------------------- */
  const [step, setStep] = useState(1)
  const [releaseType, setReleaseType] =
    useState<ExistsByDocumentAndTypeQueryParamsTypeEnum>(
      existsByDocumentAndTypeQueryParamsTypeEnum.GUEST
    )
  const [document, setDocument] = useState('')
  const [notFound, setNotFound] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [hasCriminalBackgroundCheck, setHasCriminalBackgroundCheck] =
    useState(true)

  const [hasVehicle, setHasVehicle] = useState(false)
  const [vehicleBrand, setVehicleBrand] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')

  const [validFrom, setValidFrom] = useState(isoToLocalDate(''))
  const [validUntil, setValidUntil] = useState(isoToLocalDate(''))
  const [dailyStart, setDailyStart] = useState(isoToLocalTime(''))
  const [dailyEnd, setDailyEnd] = useState(isoToLocalTime(''))

  /* --------------------------- Mutations --------------------------- */
  const createFamily = useCreateFamilyRelease({ mutation: { onSuccess } })
  const createGuest = useCreateGuestRelease({ mutation: { onSuccess } })
  const createDelivery = useCreateDeliveryRelease({ mutation: { onSuccess } })
  const createDriver = useCreateDriverRelease({ mutation: { onSuccess } })
  const createProvider = useCreateServiceProviderRelease({
    mutation: { onSuccess },
  })

  /* ----------------------- Verif. Documento ----------------------- */
  const canCheck = document.length >= 11
  const checkType =
    releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.GUEST ||
    releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.FAMILY ||
    releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER
      ? releaseType
      : existsByDocumentAndTypeQueryParamsTypeEnum.GUEST

  const existsQuery = useExistsByDocumentAndType(
    { document, type: checkType },
    { query: { enabled: canCheck, refetchOnMount: false, refetchOnWindowFocus: false } }
  )

  async function handleContinue() {
    const res = await existsQuery.refetch()
    setNotFound(!res.data?.exists)
    setStep(res.data?.exists ? 3 : 2)
  }

  function validateVisitorFields() {
    const filled = name && phone && document
    const needsVehicle =
      releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY ||
      releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER ||
      hasVehicle
    return filled && (!needsVehicle || (vehicleBrand && vehicleModel && vehicleColor && vehiclePlate))
  }

  function validateReleaseFields() {
    if (releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER) {
      // For service providers, ensure dailyEnd is after dailyStart
      const startTime = new Date(`2000-01-01T${dailyStart}`)
      const endTime = new Date(`2000-01-01T${dailyEnd}`)
      if (endTime <= startTime) {
        return false
      }
    }
    return validFrom && validUntil && dailyStart && dailyEnd
  }

  function handleSubmit() {
    if (!validateReleaseFields()) return

    const visitor = {
      name,
      document,
      phone,
      hasCriminalBackgroundCheck: releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER ? hasCriminalBackgroundCheck : false,
      isExceptional: releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER ? false : false,
      vehicle: (releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY ||
        releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER ||
        hasVehicle) ? {
          brand: vehicleBrand,
          model: vehicleModel,
          color: vehicleColor,
          plate: vehiclePlate
        } : undefined
    }

    const payload = {
      unitId: propertyId,
      validFrom: validFrom,
      validUntil: validUntil,
      dailyStart: formatTimeForBackend(dailyStart),
      dailyEnd: formatTimeForBackend(dailyEnd),
      visitor,
    }

    console.log('Payload being sent:', payload) // Debug log

    switch (releaseType) {
      case existsByDocumentAndTypeQueryParamsTypeEnum.FAMILY:
        return createFamily.mutate({ data: payload })
      case existsByDocumentAndTypeQueryParamsTypeEnum.GUEST:
        return createGuest.mutate({ data: payload })
      case existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY:
        return createDelivery.mutate({ data: payload })
      case existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER:
        return createDriver.mutate({ data: payload })
      case existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER:
        return createProvider.mutate({ data: payload })
    }
  }

  return (
    <div className="space-y-4 w-full bg-white">

      {step === 1 && (
        <>
          <h2 className="text-lg font-semibold">Passo 1: Tipo e Documento</h2>

          <Select
            value={releaseType}
            onValueChange={(val) => setReleaseType(val as ExistsByDocumentAndTypeQueryParamsTypeEnum)}
          >
            <SelectTrigger><SelectValue placeholder="Tipo de liberação" /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo</SelectLabel>
                <SelectItem value={existsByDocumentAndTypeQueryParamsTypeEnum.FAMILY}>Família</SelectItem>
                <SelectItem value={existsByDocumentAndTypeQueryParamsTypeEnum.GUEST}>Convidado</SelectItem>
                <SelectItem value={existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY}>Entregador</SelectItem>
                <SelectItem value={existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER}>Motorista</SelectItem>
                <SelectItem value={existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER}>Prestador de Serviço</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <MaskedDocumentInput
            accountType="cpf"
            value={document}
            onValueChange={setDocument}
            placeholder="Documento do visitante"
          />

          <Button className="w-full" onClick={handleContinue} disabled={!canCheck}>
            Verificar Documento
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-lg font-semibold">Passo 2: Dados do Visitante</h2>

          <Input placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />

          {(releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY ||
            releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER ||
            releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER) && (
            <div>
              <label className="text-sm">Possui antecedentes criminais?</label>
              <Select value={hasCriminalBackgroundCheck ? 'true' : 'false'} onValueChange={(val) => setHasCriminalBackgroundCheck(val === 'true')}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {(releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.FAMILY ||
            releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.GUEST ||
            releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER) && (
            <div>
              <label className="text-sm">O visitante possui veículo?</label>
              <Select value={hasVehicle ? 'yes' : 'no'} onValueChange={(val) => setHasVehicle(val === 'yes')}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {(releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER ||
            releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY ||
            hasVehicle) && (
            <div className="grid gap-2 mt-2">
              <Input placeholder="Marca do veículo" value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)} />
              <Input placeholder="Modelo do veículo" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
              <Input placeholder="Cor do veículo" value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
              <Input placeholder="Placa do veículo" value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
            </div>
          )}

          <Button className="w-full" onClick={() => setStep(3)} disabled={!validateVisitorFields()}>
            Continuar para Liberação
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-lg font-semibold">Passo 3: Dados da Liberação</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validFrom">Início da liberação</Label>
              <Input
                id="validFrom"
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Fim da liberação</Label>
              <Input
                id="validUntil"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dailyStart">Horário diário de entrada</Label>
              <Input
                id="dailyStart"
                type="time"
                value={dailyStart}
                onChange={(e) => setDailyStart(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyEnd">Horário diário de saída</Label>
              <Input
                id="dailyEnd"
                type="time"
                value={dailyEnd}
                onChange={(e) => setDailyEnd(e.target.value)}
                required
              />
            </div>
          </div>

          {releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h3 className="text-sm font-medium text-yellow-800">Regras para Prestadores de Serviço</h3>
              <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>O prestador só poderá entrar no horário permitido</li>
                <li>A saída deve ser feita dentro do horário estabelecido</li>
                <li>Em caso de necessidade de saída após o horário, será necessário justificativa e aprovação do morador</li>
              </ul>
            </div>
          )}

          <Button className="w-full mt-4" onClick={handleSubmit} disabled={!validateReleaseFields()}>
            Criar Liberação
          </Button>
        </>
      )}
    </div>
  )
}
