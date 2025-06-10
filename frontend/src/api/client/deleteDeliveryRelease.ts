import client from '@/lib/api'
import type { DeleteDeliveryReleaseMutationResponse, DeleteDeliveryReleasePathParams } from '../models/DeleteDeliveryRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getDeleteDeliveryReleaseUrl(id: DeleteDeliveryReleasePathParams['id']) {
  return `http://localhost:8080/releases/delivery/${id}` as const
}

/**
 * {@link /releases/delivery/:id}
 */
export async function deleteDeliveryRelease(id: DeleteDeliveryReleasePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteDeliveryReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteDeliveryReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}