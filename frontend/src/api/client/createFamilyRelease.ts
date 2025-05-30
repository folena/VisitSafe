import client from '@/lib/api'
import type { CreateFamilyReleaseMutationRequest, CreateFamilyReleaseMutationResponse } from '../models/CreateFamilyRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateFamilyReleaseUrl() {
  return `http://localhost:8080/releases/family` as const
}

/**
 * {@link /releases/family}
 */
export async function createFamilyRelease(
  data: CreateFamilyReleaseMutationRequest,
  config: Partial<RequestConfig<CreateFamilyReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateFamilyReleaseMutationResponse, ResponseErrorConfig<Error>, CreateFamilyReleaseMutationRequest>({
    method: 'POST',
    url: getCreateFamilyReleaseUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}