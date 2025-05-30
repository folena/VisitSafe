import client from '@/lib/api'
import type { CancelReleaseMutationResponse, CancelReleasePathParams } from '../models/CancelRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCancelReleaseUrl(id: CancelReleasePathParams['id']) {
  return `http://localhost:8080/releases/${id}/cancel` as const
}

/**
 * {@link /releases/:id/cancel}
 */
export async function cancelRelease(id: CancelReleasePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CancelReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getCancelReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}