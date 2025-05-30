import client from '@/lib/api'
import type {
  UpdateDeliveryReleaseMutationRequest,
  UpdateDeliveryReleaseMutationResponse,
  UpdateDeliveryReleasePathParams,
} from '../models/UpdateDeliveryRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getUpdateDeliveryReleaseUrl(id: UpdateDeliveryReleasePathParams['id']) {
  return `http://localhost:8080/releases/delivery/${id}` as const
}

/**
 * {@link /releases/delivery/:id}
 */
export async function updateDeliveryRelease(
  id: UpdateDeliveryReleasePathParams['id'],
  data: UpdateDeliveryReleaseMutationRequest,
  config: Partial<RequestConfig<UpdateDeliveryReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateDeliveryReleaseMutationResponse, ResponseErrorConfig<Error>, UpdateDeliveryReleaseMutationRequest>({
    method: 'PUT',
    url: getUpdateDeliveryReleaseUrl(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}