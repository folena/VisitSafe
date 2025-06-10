export type CheckoutReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type CheckoutRelease200 = any

export type CheckoutReleaseMutationResponse = CheckoutRelease200

export type CheckoutReleaseMutation = {
  Response: CheckoutRelease200
  PathParams: CheckoutReleasePathParams
  Errors: any
}