import client from '@/lib/api'
import type { ActivateUnitAssociationCodeMutationResponse, ActivateUnitAssociationCodeQueryParams } from '../models/ActivateUnitAssociationCode.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getActivateUnitAssociationCodeUrl() {
  return `http://localhost:8080/units/associate/activate` as const
}

/**
 * @description Link a unit to an owner using a code and email
 * @summary Activate a unit association code
 * {@link /units/associate/activate}
 */
export async function activateUnitAssociationCode(
  params: ActivateUnitAssociationCodeQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ActivateUnitAssociationCodeMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getActivateUnitAssociationCodeUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}