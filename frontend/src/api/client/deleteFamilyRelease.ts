import client from '@/lib/api'
import type { DeleteFamilyReleaseMutationResponse, DeleteFamilyReleasePathParams } from '../models/DeleteFamilyRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getDeleteFamilyReleaseUrl(id: DeleteFamilyReleasePathParams['id']) {
  return `http://localhost:8080/releases/family/${id}` as const
}

/**
 * {@link /releases/family/:id}
 */
export async function deleteFamilyRelease(id: DeleteFamilyReleasePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<DeleteFamilyReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'DELETE',
    url: getDeleteFamilyReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}