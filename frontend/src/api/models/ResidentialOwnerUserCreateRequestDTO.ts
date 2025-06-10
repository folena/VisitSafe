import type { Account } from './Account.ts'
import type { ResidentialUnit } from './ResidentialUnit.ts'

export const residentialOwnerUserCreateRequestDTODocumentTypeEnum = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type ResidentialOwnerUserCreateRequestDTODocumentTypeEnum =
  (typeof residentialOwnerUserCreateRequestDTODocumentTypeEnum)[keyof typeof residentialOwnerUserCreateRequestDTODocumentTypeEnum]

export type ResidentialOwnerUserCreateRequestDTO = {
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
  documentType?: ResidentialOwnerUserCreateRequestDTODocumentTypeEnum
  /**
   * @type object | undefined
   */
  account?: Account
  /**
   * @type array | undefined
   */
  units?: ResidentialUnit[]
}