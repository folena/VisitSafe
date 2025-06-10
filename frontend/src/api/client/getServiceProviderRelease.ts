import client from '@/lib/api'
import type { GetServiceProviderReleaseQueryResponse, GetServiceProviderReleasePathParams } from '../models/GetServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getGetServiceProviderReleaseUrl(id: GetServiceProviderReleasePathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}` as const
}

/**
 * {@link /releases/service-provider/:id}
 */
export async function getServiceProviderRelease(
  id: GetServiceProviderReleasePathParams['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<GetServiceProviderReleaseQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetServiceProviderReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}