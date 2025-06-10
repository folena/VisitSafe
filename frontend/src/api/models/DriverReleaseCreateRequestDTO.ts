import type { DriverVisitorDTO } from './DriverVisitorDTO.ts'
import type { LocalTime } from './LocalTime.ts'

export type DriverReleaseCreateRequestDTO = {
  /**
   * @description ID da unidade
   * @type string, uuid
   */
  unitId: string
  /**
   * @description Data inicial da liberação
   * @type string, date
   */
  validFrom: string
  /**
   * @description Data final da liberação
   * @type string, date
   */
  validUntil: string
  /**
   * @type object
   */
  dailyStart: LocalTime
  /**
   * @type object
   */
  dailyEnd: LocalTime
  /**
   * @type object
   */
  visitor: DriverVisitorDTO
}