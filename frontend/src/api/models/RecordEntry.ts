export type RecordEntryPathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type RecordEntry200 = any

export type RecordEntryMutationResponse = RecordEntry200

export type RecordEntryMutation = {
  Response: RecordEntry200
  PathParams: RecordEntryPathParams
  Errors: any
}