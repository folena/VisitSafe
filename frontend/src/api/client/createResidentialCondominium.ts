import client from '@/lib/api'
import type { CreateResidentialCondominiumMutationRequest, CreateResidentialCondominiumMutationResponse } from '../models/CreateResidentialCondominium.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateResidentialCondominiumUrl() {
  return `http://localhost:8080/condominiums/create/residential` as const
}

/**
 * @summary Create a Residential Condominium
 * {@link /condominiums/create/residential}
 */
export async function createResidentialCondominium(
  data: CreateResidentialCondominiumMutationRequest,
  config: Partial<RequestConfig<CreateResidentialCondominiumMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateResidentialCondominiumMutationResponse, ResponseErrorConfig<Error>, CreateResidentialCondominiumMutationRequest>({
    method: 'POST',
    url: getCreateResidentialCondominiumUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}