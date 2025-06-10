export type ApproveLateExitPathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

export type ApproveLateExitQueryParams = {
  /**
   * @type boolean
   */
  approve: boolean
}

/**
 * @description OK
 */
export type ApproveLateExit200 = any

export type ApproveLateExitMutationResponse = ApproveLateExit200

export type ApproveLateExitMutation = {
  Response: ApproveLateExit200
  PathParams: ApproveLateExitPathParams
  QueryParams: ApproveLateExitQueryParams
  Errors: any
}