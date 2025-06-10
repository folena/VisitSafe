export type ApproveLateExit1PathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

export type ApproveLateExit1QueryParams = {
  /**
   * @type boolean
   */
  approve: boolean
}

/**
 * @description OK
 */
export type ApproveLateExit1200 = any

export type ApproveLateExit1MutationResponse = ApproveLateExit1200

export type ApproveLateExit1Mutation = {
  Response: ApproveLateExit1200
  PathParams: ApproveLateExit1PathParams
  QueryParams: ApproveLateExit1QueryParams
  Errors: any
}