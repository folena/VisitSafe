export type CancelReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type CancelRelease200 = any

export type CancelReleaseMutationResponse = CancelRelease200

export type CancelReleaseMutation = {
  Response: CancelRelease200
  PathParams: CancelReleasePathParams
  Errors: any
}