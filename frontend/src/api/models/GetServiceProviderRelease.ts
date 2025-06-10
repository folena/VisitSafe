import type { ReleaseSummaryResponseDTO } from './ReleaseSummaryResponseDTO.ts'

export type GetServiceProviderReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type GetServiceProviderRelease200 = ReleaseSummaryResponseDTO

export type GetServiceProviderReleaseQueryResponse = GetServiceProviderRelease200

export type GetServiceProviderReleaseQuery = {
  Response: GetServiceProviderRelease200
  PathParams: GetServiceProviderReleasePathParams
  Errors: any
}