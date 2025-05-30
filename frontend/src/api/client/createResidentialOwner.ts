import client from '@/lib/api'
import type { CreateResidentialOwnerMutationRequest, CreateResidentialOwnerMutationResponse } from '../models/CreateResidentialOwner.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateResidentialOwnerUrl() {
  return `http://localhost:8080/users/create/residential-owner` as const
}

/**
 * @summary Create a Residential Owner User
 * {@link /users/create/residential-owner}
 */
export async function createResidentialOwner(
  data?: CreateResidentialOwnerMutationRequest,
  config: Partial<RequestConfig<CreateResidentialOwnerMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateResidentialOwnerMutationResponse, ResponseErrorConfig<Error>, CreateResidentialOwnerMutationRequest>({
    method: 'POST',
    url: getCreateResidentialOwnerUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}