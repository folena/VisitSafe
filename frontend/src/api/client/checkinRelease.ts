import client from '@/lib/api'
import type { CheckinReleaseMutationResponse, CheckinReleasePathParams } from '../models/CheckinRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCheckinReleaseUrl(id: CheckinReleasePathParams['id']) {
  return `http://localhost:8080/releases/${id}/checkin` as const
}

/**
 * {@link /releases/:id/checkin}
 */
export async function checkinRelease(id: CheckinReleasePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CheckinReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getCheckinReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}