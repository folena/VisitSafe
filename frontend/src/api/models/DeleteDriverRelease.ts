export type DeleteDriverReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type DeleteDriverRelease200 = any

export type DeleteDriverReleaseMutationResponse = DeleteDriverRelease200

export type DeleteDriverReleaseMutation = {
  Response: DeleteDriverRelease200
  PathParams: DeleteDriverReleasePathParams
  Errors: any
}