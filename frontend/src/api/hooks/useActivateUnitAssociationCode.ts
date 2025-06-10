import client from '@kubb/plugin-client/clients/axios'
import type { ActivateUnitAssociationCodeMutationResponse, ActivateUnitAssociationCodeQueryParams } from '../models/ActivateUnitAssociationCode.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { activateUnitAssociationCode } from '../client/activateUnitAssociationCode.ts'
import { useMutation } from '@tanstack/react-query'

export const activateUnitAssociationCodeMutationKey = () => [{ url: '/units/associate/activate' }] as const

export type ActivateUnitAssociationCodeMutationKey = ReturnType<typeof activateUnitAssociationCodeMutationKey>

/**
 * @description Link a unit to an owner using a code and email
 * @summary Activate a unit association code
 * {@link /units/associate/activate}
 */
export function useActivateUnitAssociationCode<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ActivateUnitAssociationCodeMutationResponse,
      ResponseErrorConfig<Error>,
      { params: ActivateUnitAssociationCodeQueryParams },
      TContext
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? activateUnitAssociationCodeMutationKey()

  return useMutation<ActivateUnitAssociationCodeMutationResponse, ResponseErrorConfig<Error>, { params: ActivateUnitAssociationCodeQueryParams }, TContext>({
    mutationFn: async ({ params }) => {
      return activateUnitAssociationCode(params, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}