export type DeleteDeliveryReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type DeleteDeliveryRelease200 = any

export type DeleteDeliveryReleaseMutationResponse = DeleteDeliveryRelease200

export type DeleteDeliveryReleaseMutation = {
  Response: DeleteDeliveryRelease200
  PathParams: DeleteDeliveryReleasePathParams
  Errors: any
}