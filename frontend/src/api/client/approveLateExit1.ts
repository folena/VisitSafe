import client from '@/lib/api'
import type { ApproveLateExit1MutationResponse, ApproveLateExit1PathParams, ApproveLateExit1QueryParams } from '../models/ApproveLateExit1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getApproveLateExit1Url(id: ApproveLateExit1PathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}/approve` as const
}

/**
 * {@link /releases/service-provider/:id/approve}
 */
export async function approveLateExit1(
  id: ApproveLateExit1PathParams['id'],
  params: ApproveLateExit1QueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApproveLateExit1MutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getApproveLateExit1Url(id).toString(),
    params,
    ...requestConfig,
  })
  return res.data
}