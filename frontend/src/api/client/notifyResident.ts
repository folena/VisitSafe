import client from '@/lib/api'
import type { NotifyResidentMutationResponse, NotifyResidentPathParams } from '../models/NotifyResident.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getNotifyResidentUrl(id: NotifyResidentPathParams['id']) {
  return `http://localhost:8080/releases/service-provider/${id}/notify` as const
}

/**
 * {@link /releases/service-provider/:id/notify}
 */
export async function notifyResident(id: NotifyResidentPathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<NotifyResidentMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getNotifyResidentUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}