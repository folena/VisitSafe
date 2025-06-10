export type DeleteUnitPathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type DeleteUnit200 = object

export type DeleteUnitMutationResponse = DeleteUnit200

export type DeleteUnitMutation = {
  Response: DeleteUnit200
  PathParams: DeleteUnitPathParams
  Errors: any
}