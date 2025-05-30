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

interface Props {
  propertyId: string
  onSuccess: () => void
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

  const [validFrom, setValidFrom] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [dailyStart, setDailyStart] = useState('')
  const [dailyEnd, setDailyEnd] = useState('')

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
    return validFrom && validUntil && dailyStart && dailyEnd
  }

  function handleSubmit() {
    if (!validateReleaseFields()) return

    const toIso = (v: string) => new Date(v).toISOString()

    const datePart = validFrom.split('T')[0]
    const dailyStartIso = toIso(`${datePart}T${dailyStart}:00`)
    const dailyEndIso   = toIso(`${datePart}T${dailyEnd}:00`)

    const visitor: any = { name, document, phone }

    if (
      releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY ||
      releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER ||
      releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.SERVICEPROVIDER
    ) {
      visitor.hasCriminalBackgroundCheck = hasCriminalBackgroundCheck
    }
    if (
      releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DELIVERY ||
      releaseType === existsByDocumentAndTypeQueryParamsTypeEnum.DRIVER ||
      hasVehicle
    ) {
      visitor.vehicle = { brand: vehicleBrand, model: vehicleModel, color: vehicleColor, plate: vehiclePlate }
    }

    const payload = {
      unitId: propertyId,
      validFrom: toIso(validFrom),
      validUntil: toIso(validUntil),
      dailyStart: dailyStartIso,
      dailyEnd: dailyEndIso,
      visitor,
    }

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

          <div className="space-y-2">
            <label className="text-sm font-medium">Início da liberação</label>
            <Input type="datetime-local" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />

            <label className="text-sm font-medium">Fim da liberação</label>
            <Input type="datetime-local" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />

            <label className="text-sm font-medium">Horário diário permitido para entrada</label>
            <Input type="time" value={dailyStart} onChange={(e) => setDailyStart(e.target.value)} />

            <label className="text-sm font-medium">Horário diário permitido para saída</label>
            <Input type="time" value={dailyEnd} onChange={(e) => setDailyEnd(e.target.value)} />
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>
            Salvar Liberação
          </Button>
        </>
      )}
    </div>
  )
}
