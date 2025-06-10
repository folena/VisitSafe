import type { Account } from './Account.ts'
import type { Condominium } from './Condominium.ts'

export const adminUserCreateRequestDTODocumentTypeEnum = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type AdminUserCreateRequestDTODocumentTypeEnum =
  (typeof adminUserCreateRequestDTODocumentTypeEnum)[keyof typeof adminUserCreateRequestDTODocumentTypeEnum]

export type AdminUserCreateRequestDTO = {
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
  documentType?: AdminUserCreateRequestDTODocumentTypeEnum
  /**
   * @type object | undefined
   */
  account?: Account
  /**
   * @type object | undefined
   */
  condominium?: Condominium
}