import client from '@/lib/api'
import type { CreateDeliveryReleaseMutationRequest, CreateDeliveryReleaseMutationResponse } from '../models/CreateDeliveryRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateDeliveryReleaseUrl() {
  return `http://localhost:8080/releases/delivery` as const
}

/**
 * {@link /releases/delivery}
 */
export async function createDeliveryRelease(
  data: CreateDeliveryReleaseMutationRequest,
  config: Partial<RequestConfig<CreateDeliveryReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateDeliveryReleaseMutationResponse, ResponseErrorConfig<Error>, CreateDeliveryReleaseMutationRequest>({
    method: 'POST',
    url: getCreateDeliveryReleaseUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}