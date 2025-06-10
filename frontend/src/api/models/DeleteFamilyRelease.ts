export type DeleteFamilyReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type DeleteFamilyRelease200 = any

export type DeleteFamilyReleaseMutationResponse = DeleteFamilyRelease200

export type DeleteFamilyReleaseMutation = {
  Response: DeleteFamilyRelease200
  PathParams: DeleteFamilyReleasePathParams
  Errors: any
}