import client from '@/lib/api'
import type {
  JustifyServiceProviderReleaseMutationRequest,
  JustifyServiceProviderReleaseMutationResponse,
  JustifyServiceProviderReleasePathParams,
} from '../models/JustifyServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getJustifyServiceProviderReleaseUrl(id: JustifyServiceProviderReleasePathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}/justification` as const
}

/**
 * {@link /releases/service-provider/:id/justification}
 */
export async function justifyServiceProviderRelease(
  id: JustifyServiceProviderReleasePathParams['id'],
  data?: JustifyServiceProviderReleaseMutationRequest,
  config: Partial<RequestConfig<JustifyServiceProviderReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<JustifyServiceProviderReleaseMutationResponse, ResponseErrorConfig<Error>, JustifyServiceProviderReleaseMutationRequest>({
    method: 'PUT',
    url: getJustifyServiceProviderReleaseUrl(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}