import client from '@/lib/api'
import type { DeleteServiceProviderReleaseMutationResponse, DeleteServiceProviderReleasePathParams } from '../models/DeleteServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getDeleteServiceProviderReleaseUrl(id: DeleteServiceProviderReleasePathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}` as const
}

/**
 * {@link /releases/service-provider/:id}
 */
export async function deleteServiceProviderRelease(
  id: DeleteServiceProviderReleasePathParams['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteServiceProviderReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteServiceProviderReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}