import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'
import type { ServiceProviderReleaseCreateRequestDTO } from './ServiceProviderReleaseCreateRequestDTO.ts'

/**
 * @description OK
 */
export type CreateServiceProviderRelease200 = ReleaseResponseDTO

export type CreateServiceProviderReleaseMutationRequest = ServiceProviderReleaseCreateRequestDTO

export type CreateServiceProviderReleaseMutationResponse = CreateServiceProviderRelease200

export type CreateServiceProviderReleaseMutation = {
  Response: CreateServiceProviderRelease200
  Request: CreateServiceProviderReleaseMutationRequest
  Errors: any
}