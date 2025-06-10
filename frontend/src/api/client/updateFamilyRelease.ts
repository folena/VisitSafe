import client from '@/lib/api'
import type { UpdateFamilyReleaseMutationRequest, UpdateFamilyReleaseMutationResponse, UpdateFamilyReleasePathParams } from '../models/UpdateFamilyRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getUpdateFamilyReleaseUrl(id: UpdateFamilyReleasePathParams['id']) {
  return `http://localhost:8080/releases/family/${id}` as const
}

/**
 * {@link /releases/family/:id}
 */
export async function updateFamilyRelease(
  id: UpdateFamilyReleasePathParams['id'],
  data: UpdateFamilyReleaseMutationRequest,
  config: Partial<RequestConfig<UpdateFamilyReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<UpdateFamilyReleaseMutationResponse, ResponseErrorConfig<Error>, UpdateFamilyReleaseMutationRequest>({
    method: 'PUT',
    url: getUpdateFamilyReleaseUrl(id).toString(),
    data,
    ...requestConfig,
  })
  return res.data
}