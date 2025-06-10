import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'
import type { ServiceProviderReleaseUpdateRequestDTO } from './ServiceProviderReleaseUpdateRequestDTO.ts'

export type UpdateServiceProviderReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type UpdateServiceProviderRelease200 = ReleaseResponseDTO

export type UpdateServiceProviderReleaseMutationRequest = ServiceProviderReleaseUpdateRequestDTO

export type UpdateServiceProviderReleaseMutationResponse = UpdateServiceProviderRelease200

export type UpdateServiceProviderReleaseMutation = {
  Response: UpdateServiceProviderRelease200
  Request: UpdateServiceProviderReleaseMutationRequest
  PathParams: UpdateServiceProviderReleasePathParams
  Errors: any
}