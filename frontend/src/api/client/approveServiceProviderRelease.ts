import client from '@/lib/api'
import type {
  ApproveServiceProviderReleaseMutationResponse,
  ApproveServiceProviderReleasePathParams,
  ApproveServiceProviderReleaseQueryParams,
} from '../models/ApproveServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getApproveServiceProviderReleaseUrl(id: ApproveServiceProviderReleasePathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}/approval` as const
}

/**
 * {@link /releases/service-provider/:id/approval}
 */
export async function approveServiceProviderRelease(
  id: ApproveServiceProviderReleasePathParams['id'],
  params: ApproveServiceProviderReleaseQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApproveServiceProviderReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'PUT',
    url: getApproveServiceProviderReleaseUrl(id).toString(),
    params,
    ...requestConfig,
  })
  return res.data
}