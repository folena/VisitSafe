import client from '@/lib/api'
import type { CreateEnterpriseCondominiumMutationRequest, CreateEnterpriseCondominiumMutationResponse } from '../models/CreateEnterpriseCondominium.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateEnterpriseCondominiumUrl() {
  return `http://localhost:8080/condominiums/create/enterprise` as const
}

/**
 * @summary Create an Enterprise Condominium
 * {@link /condominiums/create/enterprise}
 */
export async function createEnterpriseCondominium(
  data: CreateEnterpriseCondominiumMutationRequest,
  config: Partial<RequestConfig<CreateEnterpriseCondominiumMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateEnterpriseCondominiumMutationResponse, ResponseErrorConfig<Error>, CreateEnterpriseCondominiumMutationRequest>({
    method: 'POST',
    url: getCreateEnterpriseCondominiumUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}