export type AddressDTO = {
  /**
   * @description Rua
   * @type string
   */
  street: string
  /**
   * @description Bairro
   * @type string
   */
  neighborhood: string
  /**
   * @description Cidade
   * @type string
   */
  city: string
  /**
   * @description Estado (UF)
   * @type string
   */
  state: string
  /**
   * @description CEP
   * @type string
   */
  zipCode: string
  /**
   * @description Complemento (opcional)
   * @type string | undefined
   */
  complement?: string
}