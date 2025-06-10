export type NotifyResidentPathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type NotifyResident200 = any

export type NotifyResidentMutationResponse = NotifyResident200

export type NotifyResidentMutation = {
  Response: NotifyResident200
  PathParams: NotifyResidentPathParams
  Errors: any
}