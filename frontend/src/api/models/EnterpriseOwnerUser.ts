import type { Account } from './Account.ts'
import type { EnterpriseUnit } from './EnterpriseUnit.ts'

export const enterpriseOwnerUserDocumentTypeEnum = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type EnterpriseOwnerUserDocumentTypeEnum = (typeof enterpriseOwnerUserDocumentTypeEnum)[keyof typeof enterpriseOwnerUserDocumentTypeEnum]

export type EnterpriseOwnerUser = {
  /**
   * @type string | undefined, uuid
   */
  id?: string
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
  documentType?: EnterpriseOwnerUserDocumentTypeEnum
  /**
   * @type object | undefined
   */
  account?: Account
  /**
   * @type string | undefined, date-time
   */
  createdAt?: string
  /**
   * @type string | undefined, date-time
   */
  updatedAt?: string
  /**
   * @type array | undefined
   */
  units?: EnterpriseUnit[]
}