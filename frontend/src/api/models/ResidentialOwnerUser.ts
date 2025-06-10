import type { Account } from './Account.ts'
import type { ResidentialUnit } from './ResidentialUnit.ts'

export const residentialOwnerUserDocumentTypeEnum = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type ResidentialOwnerUserDocumentTypeEnum = (typeof residentialOwnerUserDocumentTypeEnum)[keyof typeof residentialOwnerUserDocumentTypeEnum]

export type ResidentialOwnerUser = {
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
  documentType?: ResidentialOwnerUserDocumentTypeEnum
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
  units?: ResidentialUnit[]
}