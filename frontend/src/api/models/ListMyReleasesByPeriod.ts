import type { ReleaseSummaryResponseDTO } from './ReleaseSummaryResponseDTO.ts'

export type ListMyReleasesByPeriodQueryParams = {
  /**
   * @type string, uuid
   */
  propertyId: string
  /**
   * @type string, date
   */
  startDate: string
  /**
   * @type string, date
   */
  endDate: string
}

/**
 * @description OK
 */
export type ListMyReleasesByPeriod200 = ReleaseSummaryResponseDTO[]

export type ListMyReleasesByPeriodQueryResponse = ListMyReleasesByPeriod200

export type ListMyReleasesByPeriodQuery = {
  Response: ListMyReleasesByPeriod200
  QueryParams: ListMyReleasesByPeriodQueryParams
  Errors: any
}