import type { PageReleaseSummaryResponseDTO } from './PageReleaseSummaryResponseDTO.ts'

export type GetAllPendingTodayQueryParams = {
  /**
   * @default 0
   * @type integer | undefined, int32
   */
  page?: number
  /**
   * @default 10
   * @type integer | undefined, int32
   */
  size?: number
}

/**
 * @description OK
 */
export type GetAllPendingToday200 = PageReleaseSummaryResponseDTO

export type GetAllPendingTodayQueryResponse = GetAllPendingToday200

export type GetAllPendingTodayQuery = {
  Response: GetAllPendingToday200
  QueryParams: GetAllPendingTodayQueryParams
  Errors: any
}