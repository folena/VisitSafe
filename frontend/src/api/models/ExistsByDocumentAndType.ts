import type { VisitorExistsResponseDTO } from './VisitorExistsResponseDTO.ts'

export const existsByDocumentAndTypeQueryParamsTypeEnum = {
  GUEST: 'GUEST',
  FAMILY: 'FAMILY',
  SERVICEPROVIDER: 'SERVICEPROVIDER',
  DELIVERY: 'DELIVERY',
  DRIVER: 'DRIVER',
} as const

export type ExistsByDocumentAndTypeQueryParamsTypeEnum =
  (typeof existsByDocumentAndTypeQueryParamsTypeEnum)[keyof typeof existsByDocumentAndTypeQueryParamsTypeEnum]

export type ExistsByDocumentAndTypeQueryParams = {
  /**
   * @type string
   */
  document: string
  /**
   * @description Tipos de liberação
   * @type string
   */
  type: ExistsByDocumentAndTypeQueryParamsTypeEnum
}

/**
 * @description OK
 */
export type ExistsByDocumentAndType200 = VisitorExistsResponseDTO

export type ExistsByDocumentAndTypeQueryResponse = ExistsByDocumentAndType200

export type ExistsByDocumentAndTypeQuery = {
  Response: ExistsByDocumentAndType200
  QueryParams: ExistsByDocumentAndTypeQueryParams
  Errors: any
}