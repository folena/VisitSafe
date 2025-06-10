import client from '@/lib/api'
import type { ApproveLateExitMutationResponse, ApproveLateExitPathParams, ApproveLateExitQueryParams } from '../models/ApproveLateExit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getApproveLateExitUrl(id: ApproveLateExitPathParams['id']) {
  return `http://localhost:8080/releases/service-provider-exception/${id}/approve-late-exit` as const
}

/**
 * @summary Approve or reject late exit
 * {@link /releases/service-provider-exception/:id/approve-late-exit}
 */
export async function approveLateExit(
  id: ApproveLateExitPathParams['id'],
  params: ApproveLateExitQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ApproveLateExitMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'PUT',
    url: getApproveLateExitUrl(id).toString(),
    params,
    ...requestConfig,
  })
  return res.data
}