import type { ServiceProviderReleaseJustificationDTO } from './ServiceProviderReleaseJustificationDTO.ts'

export type RecordExit1PathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type RecordExit1200 = any

export type RecordExit1MutationRequest = ServiceProviderReleaseJustificationDTO

export type RecordExit1MutationResponse = RecordExit1200

export type RecordExit1Mutation = {
  Response: RecordExit1200
  Request: RecordExit1MutationRequest
  PathParams: RecordExit1PathParams
  Errors: any
}