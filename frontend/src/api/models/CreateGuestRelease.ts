import type { GuestReleaseCreateRequestDTO } from './GuestReleaseCreateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

/**
 * @description OK
 */
export type CreateGuestRelease200 = ReleaseResponseDTO

export type CreateGuestReleaseMutationRequest = GuestReleaseCreateRequestDTO

export type CreateGuestReleaseMutationResponse = CreateGuestRelease200

export type CreateGuestReleaseMutation = {
  Response: CreateGuestRelease200
  Request: CreateGuestReleaseMutationRequest
  Errors: any
}