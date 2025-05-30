import type { PageReleaseSummaryResponseDTO } from './PageReleaseSummaryResponseDTO.ts'

export type GetAllCheckedInTodayQueryParams = {
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
export type GetAllCheckedInToday200 = PageReleaseSummaryResponseDTO

export type GetAllCheckedInTodayQueryResponse = GetAllCheckedInToday200

export type GetAllCheckedInTodayQuery = {
  Response: GetAllCheckedInToday200
  QueryParams: GetAllCheckedInTodayQueryParams
  Errors: any
}