import client from '@/lib/api'
import type { RecordEntry1MutationResponse, RecordEntry1PathParams } from '../models/RecordEntry1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getRecordEntry1Url(id: RecordEntry1PathParams['id']) {
  return `http://localhost:8080/releases/service-provider-exception/${id}/entry` as const
}

/**
 * @summary Record service provider entry
 * {@link /releases/service-provider-exception/:id/entry}
 */
export async function recordEntry1(id: RecordEntry1PathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<RecordEntry1MutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getRecordEntry1Url(id).toString(),
    ...requestConfig,
  })
  return res.data
}