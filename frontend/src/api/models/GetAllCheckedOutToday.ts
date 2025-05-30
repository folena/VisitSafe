import type { PageReleaseSummaryResponseDTO } from './PageReleaseSummaryResponseDTO.ts'

export type GetAllCheckedOutTodayQueryParams = {
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
export type GetAllCheckedOutToday200 = PageReleaseSummaryResponseDTO

export type GetAllCheckedOutTodayQueryResponse = GetAllCheckedOutToday200

export type GetAllCheckedOutTodayQuery = {
  Response: GetAllCheckedOutToday200
  QueryParams: GetAllCheckedOutTodayQueryParams
  Errors: any
}