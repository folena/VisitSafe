export type ResidentialCondominiumCreateRequestDTO = {
  /**
   * @type string
   */
  name: string
  /**
   * @pattern \d{14}
   * @type string
   */
  cnpj: string
}