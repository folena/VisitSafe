import client from '@/lib/api'
import type {
  UpdateServiceProviderReleaseMutationRequest,
  UpdateServiceProviderReleaseMutationResponse,
  UpdateServiceProviderReleasePathParams,
} from '../models/UpdateServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getUpdateServiceProviderReleaseUrl(id: UpdateServiceProviderReleasePathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}` as const
}

/**
 * {@link /releases/service-provider/:id}
 */
export async function updateServiceProviderRelease(
  id: UpdateServiceProviderReleasePathParams['id'],
  data: UpdateServiceProviderReleaseMutationRequest,
  config: Partial<RequestConfig<UpdateServiceProviderReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateServiceProviderReleaseMutationResponse, ResponseErrorConfig<Error>, UpdateServiceProviderReleaseMutationRequest>({
    method: 'PUT',
    url: getUpdateServiceProviderReleaseUrl(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}