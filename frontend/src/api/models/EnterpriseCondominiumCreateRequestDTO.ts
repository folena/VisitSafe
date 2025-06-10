export type EnterpriseCondominiumCreateRequestDTO = {
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