import client from '@/lib/api'
import type { RecordExit1MutationRequest, RecordExit1MutationResponse, RecordExit1PathParams } from '../models/RecordExit1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getRecordExit1Url(id: RecordExit1PathParams['id']) {
  return `http://localhost:8080/releases/service-provider-exception/${id}/exit` as const
}

/**
 * @summary Record service provider exit
 * {@link /releases/service-provider-exception/:id/exit}
 */
export async function recordExit1(
  id: RecordExit1PathParams['id'],
  data: RecordExit1MutationRequest,
  config: Partial<RequestConfig<RecordExit1MutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<RecordExit1MutationResponse, ResponseErrorConfig<Error>, RecordExit1MutationRequest>({
    method: 'POST',
    url: getRecordExit1Url(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}