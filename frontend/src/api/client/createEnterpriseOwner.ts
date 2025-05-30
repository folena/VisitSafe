import client from '@/lib/api'
import type { CreateEnterpriseOwnerMutationRequest, CreateEnterpriseOwnerMutationResponse } from '../models/CreateEnterpriseOwner.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateEnterpriseOwnerUrl() {
  return `http://localhost:8080/users/create/enterprise-owner` as const
}

/**
 * @summary Create an Enterprise Owner User
 * {@link /users/create/enterprise-owner}
 */
export async function createEnterpriseOwner(
  data?: CreateEnterpriseOwnerMutationRequest,
  config: Partial<RequestConfig<CreateEnterpriseOwnerMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateEnterpriseOwnerMutationResponse, ResponseErrorConfig<Error>, CreateEnterpriseOwnerMutationRequest>({
    method: 'POST',
    url: getCreateEnterpriseOwnerUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}