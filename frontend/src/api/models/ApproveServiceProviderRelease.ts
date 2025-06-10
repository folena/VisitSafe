export type ApproveServiceProviderReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

export type ApproveServiceProviderReleaseQueryParams = {
  /**
   * @type boolean
   */
  approve: boolean
}

/**
 * @description OK
 */
export type ApproveServiceProviderRelease200 = any

export type ApproveServiceProviderReleaseMutationResponse = ApproveServiceProviderRelease200

export type ApproveServiceProviderReleaseMutation = {
  Response: ApproveServiceProviderRelease200
  PathParams: ApproveServiceProviderReleasePathParams
  QueryParams: ApproveServiceProviderReleaseQueryParams
  Errors: any
}