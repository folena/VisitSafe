import client from '@/lib/api'
import type { DeleteGuestReleaseMutationResponse, DeleteGuestReleasePathParams } from '../models/DeleteGuestRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getDeleteGuestReleaseUrl(id: DeleteGuestReleasePathParams['id']) {
  return `http://localhost:8080/releases/guest/${id}` as const
}

/**
 * {@link /releases/guest/:id}
 */
export async function deleteGuestRelease(id: DeleteGuestReleasePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteGuestReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteGuestReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}