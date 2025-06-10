import type { DeliveryReleaseCreateRequestDTO } from './DeliveryReleaseCreateRequestDTO.ts'
import type { ReleaseResponseDTO } from './ReleaseResponseDTO.ts'

/**
 * @description OK
 */
export type CreateDeliveryRelease200 = ReleaseResponseDTO

export type CreateDeliveryReleaseMutationRequest = DeliveryReleaseCreateRequestDTO

export type CreateDeliveryReleaseMutationResponse = CreateDeliveryRelease200

export type CreateDeliveryReleaseMutation = {
  Response: CreateDeliveryRelease200
  Request: CreateDeliveryReleaseMutationRequest
  Errors: any
}