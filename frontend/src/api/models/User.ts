import type { Account } from './Account.ts'

export const userDocumentTypeEnum = {
  CPF: 'CPF',
  CNPJ: 'CNPJ',
} as const

export type UserDocumentTypeEnum = (typeof userDocumentTypeEnum)[keyof typeof userDocumentTypeEnum]

export type User = {
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
  documentType?: UserDocumentTypeEnum
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
}