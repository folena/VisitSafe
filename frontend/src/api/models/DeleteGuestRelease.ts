export type DeleteGuestReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type DeleteGuestRelease200 = any

export type DeleteGuestReleaseMutationResponse = DeleteGuestRelease200

export type DeleteGuestReleaseMutation = {
  Response: DeleteGuestRelease200
  PathParams: DeleteGuestReleasePathParams
  Errors: any
}