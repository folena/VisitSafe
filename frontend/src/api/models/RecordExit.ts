export type RecordExitPathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type RecordExit200 = any

export type RecordExitMutationResponse = RecordExit200

export type RecordExitMutation = {
  Response: RecordExit200
  PathParams: RecordExitPathParams
  Errors: any
}