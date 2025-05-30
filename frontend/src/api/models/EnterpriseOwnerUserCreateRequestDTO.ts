import type { Account } from './Account.ts'
import type { EnterpriseUnit } from './EnterpriseUnit.ts'

export const enterpriseOwnerUserCreateRequestDTODocumentTypeEnum = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type EnterpriseOwnerUserCreateRequestDTODocumentTypeEnum =
  (typeof enterpriseOwnerUserCreateRequestDTODocumentTypeEnum)[keyof typeof enterpriseOwnerUserCreateRequestDTODocumentTypeEnum]

export type EnterpriseOwnerUserCreateRequestDTO = {
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
  documentType?: EnterpriseOwnerUserCreateRequestDTODocumentTypeEnum
  /**
   * @type object | undefined
   */
  account?: Account
  /**
   * @type array | undefined
   */
  units?: EnterpriseUnit[]
}