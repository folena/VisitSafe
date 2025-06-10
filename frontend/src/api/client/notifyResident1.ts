import client from '@/lib/api'
import type { NotifyResident1MutationResponse, NotifyResident1PathParams } from '../models/NotifyResident1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getNotifyResident1Url(id: NotifyResident1PathParams['id']) {
  return `http://localhost:8080/releases/service-provider-exception/${id}/notify-resident` as const
}

/**
 * @summary Notify resident about late exit
 * {@link /releases/service-provider-exception/:id/notify-resident}
 */
export async function notifyResident1(id: NotifyResident1PathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<NotifyResident1MutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getNotifyResident1Url(id).toString(),
    ...requestConfig,
  })
  return res.data
}