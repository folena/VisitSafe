export type RecordEntry1PathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type RecordEntry1200 = any

export type RecordEntry1MutationResponse = RecordEntry1200

export type RecordEntry1Mutation = {
  Response: RecordEntry1200
  PathParams: RecordEntry1PathParams
  Errors: any
}