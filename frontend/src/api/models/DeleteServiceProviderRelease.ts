export type DeleteServiceProviderReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type DeleteServiceProviderRelease200 = any

export type DeleteServiceProviderReleaseMutationResponse = DeleteServiceProviderRelease200

export type DeleteServiceProviderReleaseMutation = {
  Response: DeleteServiceProviderRelease200
  PathParams: DeleteServiceProviderReleasePathParams
  Errors: any
}