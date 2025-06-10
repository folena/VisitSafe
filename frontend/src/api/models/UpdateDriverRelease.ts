import type { DriverReleaseUpdateRequestDTO } from './DriverReleaseUpdateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

export type UpdateDriverReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type UpdateDriverRelease200 = ReleaseResponseDTO

export type UpdateDriverReleaseMutationRequest = DriverReleaseUpdateRequestDTO

export type UpdateDriverReleaseMutationResponse = UpdateDriverRelease200

export type UpdateDriverReleaseMutation = {
  Response: UpdateDriverRelease200
  Request: UpdateDriverReleaseMutationRequest
  PathParams: UpdateDriverReleasePathParams
  Errors: any
}