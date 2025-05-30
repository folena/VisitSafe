import type { FamilyReleaseUpdateRequestDTO } from './FamilyReleaseUpdateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

export type UpdateFamilyReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type UpdateFamilyRelease200 = ReleaseResponseDTO

export type UpdateFamilyReleaseMutationRequest = FamilyReleaseUpdateRequestDTO

export type UpdateFamilyReleaseMutationResponse = UpdateFamilyRelease200

export type UpdateFamilyReleaseMutation = {
  Response: UpdateFamilyRelease200
  Request: UpdateFamilyReleaseMutationRequest
  PathParams: UpdateFamilyReleasePathParams
  Errors: any
}