export const condominiumResponseDTOCondominiumTypeEnum = {
  BUSINESS: 'BUSINESS',
  RESIDENTIAL: 'RESIDENTIAL',
} as const

export type CondominiumResponseDTOCondominiumTypeEnum =
  (typeof condominiumResponseDTOCondominiumTypeEnum)[keyof typeof condominiumResponseDTOCondominiumTypeEnum]

export type CondominiumResponseDTO = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  cnpj?: string
  /**
   * @type string | undefined
   */
  condominiumType?: CondominiumResponseDTOCondominiumTypeEnum
}