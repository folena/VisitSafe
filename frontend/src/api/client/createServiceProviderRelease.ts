import client from '@/lib/api'
import type { CreateServiceProviderReleaseMutationRequest, CreateServiceProviderReleaseMutationResponse } from '../models/CreateServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateServiceProviderReleaseUrl() {
  return `http://localhost:8080/releases/service-provider` as const
}

/**
 * {@link /releases/service-provider}
 */
export async function createServiceProviderRelease(
  data: CreateServiceProviderReleaseMutationRequest,
  config: Partial<RequestConfig<CreateServiceProviderReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateServiceProviderReleaseMutationResponse, ResponseErrorConfig<Error>, CreateServiceProviderReleaseMutationRequest>({
    method: 'POST',
    url: getCreateServiceProviderReleaseUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}