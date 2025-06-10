import type { FamilyReleaseCreateRequestDTO } from './FamilyReleaseCreateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

/**
 * @description OK
 */
export type CreateFamilyRelease200 = ReleaseResponseDTO

export type CreateFamilyReleaseMutationRequest = FamilyReleaseCreateRequestDTO

export type CreateFamilyReleaseMutationResponse = CreateFamilyRelease200

export type CreateFamilyReleaseMutation = {
  Response: CreateFamilyRelease200
  Request: CreateFamilyReleaseMutationRequest
  Errors: any
}