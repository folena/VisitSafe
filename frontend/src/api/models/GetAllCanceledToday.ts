import type { PageReleaseSummaryResponseDTO } from './PageReleaseSummaryResponseDTO.ts'

export type GetAllCanceledTodayQueryParams = {
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
export type GetAllCanceledToday200 = PageReleaseSummaryResponseDTO

export type GetAllCanceledTodayQueryResponse = GetAllCanceledToday200

export type GetAllCanceledTodayQuery = {
  Response: GetAllCanceledToday200
  QueryParams: GetAllCanceledTodayQueryParams
  Errors: any
}