export type CheckinReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type CheckinRelease200 = any

export type CheckinReleaseMutationResponse = CheckinRelease200

export type CheckinReleaseMutation = {
  Response: CheckinRelease200
  PathParams: CheckinReleasePathParams
  Errors: any
}