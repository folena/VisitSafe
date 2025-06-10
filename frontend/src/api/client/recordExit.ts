import client from '@/lib/api'
import type { RecordExitMutationResponse, RecordExitPathParams } from '../models/RecordExit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getRecordExitUrl(id: RecordExitPathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}/exit` as const
}

/**
 * {@link /releases/service-provider/:id/exit}
 */
export async function recordExit(id: RecordExitPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<RecordExitMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getRecordExitUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}