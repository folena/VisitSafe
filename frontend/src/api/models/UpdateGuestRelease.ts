import type { GuestReleaseUpdateRequestDTO } from './GuestReleaseUpdateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

export type UpdateGuestReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type UpdateGuestRelease200 = ReleaseResponseDTO

export type UpdateGuestReleaseMutationRequest = GuestReleaseUpdateRequestDTO

export type UpdateGuestReleaseMutationResponse = UpdateGuestRelease200

export type UpdateGuestReleaseMutation = {
  Response: UpdateGuestRelease200
  Request: UpdateGuestReleaseMutationRequest
  PathParams: UpdateGuestReleasePathParams
  Errors: any
}