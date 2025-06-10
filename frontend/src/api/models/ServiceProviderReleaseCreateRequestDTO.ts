import type { LocalTime } from './LocalTime.ts'
import type { ServiceProviderVisitorDTO } from './ServiceProviderVisitorDTO.ts'

export type ServiceProviderReleaseCreateRequestDTO = {
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
  visitor: ServiceProviderVisitorDTO
}