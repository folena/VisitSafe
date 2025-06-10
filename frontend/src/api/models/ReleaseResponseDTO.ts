import type { LocalTime } from './LocalTime.ts'

export const releaseResponseDTOReleaseTypeEnum = {
  GUEST: 'GUEST',
  FAMILY: 'FAMILY',
  SERVICEPROVIDER: 'SERVICEPROVIDER',
  DELIVERY: 'DELIVERY',
  DRIVER: 'DRIVER',
} as const

export type ReleaseResponseDTOReleaseTypeEnum = (typeof releaseResponseDTOReleaseTypeEnum)[keyof typeof releaseResponseDTOReleaseTypeEnum]

export type ReleaseResponseDTO = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined, date
   */
  validFrom?: string
  /**
   * @type string | undefined, date
   */
  validUntil?: string
  /**
   * @type object | undefined
   */
  dailyStart?: LocalTime
  /**
   * @type object | undefined
   */
  dailyEnd?: LocalTime
  /**
   * @description Tipos de liberação
   * @type string | undefined
   */
  releaseType?: ReleaseResponseDTOReleaseTypeEnum
}