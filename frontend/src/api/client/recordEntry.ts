import client from '@/lib/api'
import type { RecordEntryMutationResponse, RecordEntryPathParams } from '../models/RecordEntry.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getRecordEntryUrl(id: RecordEntryPathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}/entry` as const
}

/**
 * {@link /releases/service-provider/:id/entry}
 */
export async function recordEntry(id: RecordEntryPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<RecordEntryMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getRecordEntryUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}