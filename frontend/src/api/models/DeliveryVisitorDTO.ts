import type { Vehicle } from './Vehicle.ts'

/**
 * @description Dados do visitante
 */
export type DeliveryVisitorDTO = {
  /**
   * @description Nome do visitante
   * @type string
   */
  name: string
  /**
   * @description Documento do visitante
   * @type string
   */
  document: string
  /**
   * @description Telefone do visitante
   * @type string
   */
  phone: string
  /**
   * @type object | undefined
   */
  vehicle?: Vehicle
  /**
   * @description Possui antecedentes criminais
   * @type boolean
   */
  hasCriminalBackgroundCheck: boolean
}