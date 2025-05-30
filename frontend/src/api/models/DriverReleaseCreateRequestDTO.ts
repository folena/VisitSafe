import type { DriverVisitorDTO } from './DriverVisitorDTO.ts'

export type DriverReleaseCreateRequestDTO = {
  /**
   * @description ID da unidade
   * @type string, uuid
   */
  unitId: string
  /**
   * @description Início da liberação
   * @type string, date-time
   */
  validFrom: string
  /**
   * @description Fim da liberação
   * @type string, date-time
   */
  validUntil: string
  /**
   * @description Horário de entrada permitido por dia
   * @type string, date-time
   */
  dailyStart: string
  /**
   * @description Horário de saída permitido por dia
   * @type string, date-time
   */
  dailyEnd: string
  /**
   * @type object
   */
  visitor: DriverVisitorDTO
}