import type { DriverReleaseCreateRequestDTO } from './DriverReleaseCreateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

/**
 * @description OK
 */
export type CreateDriverRelease200 = ReleaseResponseDTO

export type CreateDriverReleaseMutationRequest = DriverReleaseCreateRequestDTO

export type CreateDriverReleaseMutationResponse = CreateDriverRelease200

export type CreateDriverReleaseMutation = {
  Response: CreateDriverRelease200
  Request: CreateDriverReleaseMutationRequest
  Errors: any
}