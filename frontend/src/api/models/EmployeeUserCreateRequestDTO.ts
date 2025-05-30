import type { Account } from './Account.ts'
import type { Condominium } from './Condominium.ts'

export const employeeUserCreateRequestDTODocumentTypeEnum = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type EmployeeUserCreateRequestDTODocumentTypeEnum =
  (typeof employeeUserCreateRequestDTODocumentTypeEnum)[keyof typeof employeeUserCreateRequestDTODocumentTypeEnum]

export type EmployeeUserCreateRequestDTO = {
  /**
   * @type string | undefined
   */
  name?: string
  /**
   * @type string | undefined
   */
  rawDocumentNumber?: string
  /**
   * @type string | undefined
   */
  documentType?: EmployeeUserCreateRequestDTODocumentTypeEnum
  /**
   * @type object | undefined
   */
  account?: Account
  /**
   * @type object | undefined
   */
  condominium?: Condominium
}