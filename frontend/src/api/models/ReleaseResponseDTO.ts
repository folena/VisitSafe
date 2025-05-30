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
   * @type string | undefined, date-time
   */
  validFrom?: string
  /**
   * @type string | undefined, date-time
   */
  validUntil?: string
  /**
   * @description Tipos de liberação
   * @type string | undefined
   */
  releaseType?: ReleaseResponseDTOReleaseTypeEnum
}