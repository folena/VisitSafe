import type { DeliveryReleaseUpdateRequestDTO } from './DeliveryReleaseUpdateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

export type UpdateDeliveryReleasePathParams = {
  /**
   * @type string, uuid
   */
  id: string
}

/**
 * @description OK
 */
export type UpdateDeliveryRelease200 = ReleaseResponseDTO

export type UpdateDeliveryReleaseMutationRequest = DeliveryReleaseUpdateRequestDTO

export type UpdateDeliveryReleaseMutationResponse = UpdateDeliveryRelease200

export type UpdateDeliveryReleaseMutation = {
  Response: UpdateDeliveryRelease200
  Request: UpdateDeliveryReleaseMutationRequest
  PathParams: UpdateDeliveryReleasePathParams
  Errors: any
}