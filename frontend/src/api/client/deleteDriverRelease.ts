import client from '@/lib/api'
import type { DeleteDriverReleaseMutationResponse, DeleteDriverReleasePathParams } from '../models/DeleteDriverRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getDeleteDriverReleaseUrl(id: DeleteDriverReleasePathParams['id']) {
  return `http://localhost:8080/releases/driver/${id}` as const
}

/**
 * {@link /releases/driver/:id}
 */
export async function deleteDriverRelease(id: DeleteDriverReleasePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteDriverReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteDriverReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}