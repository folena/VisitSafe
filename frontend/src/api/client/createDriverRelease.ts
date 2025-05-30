import client from '@/lib/api'
import type { CreateDriverReleaseMutationRequest, CreateDriverReleaseMutationResponse } from '../models/CreateDriverRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateDriverReleaseUrl() {
  return `http://localhost:8080/releases/driver` as const
}

/**
 * {@link /releases/driver}
 */
export async function createDriverRelease(
  data: CreateDriverReleaseMutationRequest,
  config: Partial<RequestConfig<CreateDriverReleaseMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateDriverReleaseMutationResponse, ResponseErrorConfig<Error>, CreateDriverReleaseMutationRequest>({
    method: 'POST',
    url: getCreateDriverReleaseUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}