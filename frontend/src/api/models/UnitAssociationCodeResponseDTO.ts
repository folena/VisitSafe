export type UnitAssociationCodeResponseDTO = {
  /**
   * @description Código de associação
   * @type string
   */
  code: string
  /**
   * @description Data e hora de expiração do código
   * @type string, date-time
   */
  expiresAt: string
}