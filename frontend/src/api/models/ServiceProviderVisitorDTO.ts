import type { Vehicle } from './Vehicle.ts'

/**
 * @description Dados do visitante
 */
export type ServiceProviderVisitorDTO = {
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
   * @description Possui antecedentes criminais
   * @type boolean
   */
  hasCriminalBackgroundCheck: boolean
  /**
   * @type object | undefined
   */
  vehicle?: Vehicle
  /**
   * @description Liberação excepcional (fora dos horários padrão)
   * @type boolean
   */
  isExceptional: boolean
}