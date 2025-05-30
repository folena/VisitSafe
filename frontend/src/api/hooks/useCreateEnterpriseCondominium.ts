import client from '@kubb/plugin-client/clients/axios'
import type { CreateEnterpriseCondominiumMutationRequest, CreateEnterpriseCondominiumMutationResponse } from '../models/CreateEnterpriseCondominium.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createEnterpriseCondominium } from '../client/createEnterpriseCondominium.ts'
import { useMutation } from '@tanstack/react-query'

export const createEnterpriseCondominiumMutationKey = () => [{ url: '/condominiums/create/enterprise' }] as const

export type CreateEnterpriseCondominiumMutationKey = ReturnType<typeof createEnterpriseCondominiumMutationKey>

/**
 * @summary Create an Enterprise Condominium
 * {@link /condominiums/create/enterprise}
 */
export function useCreateEnterpriseCondominium<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateEnterpriseCondominiumMutationResponse,
      ResponseErrorConfig<Error>,
      { data: CreateEnterpriseCondominiumMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateEnterpriseCondominiumMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createEnterpriseCondominiumMutationKey()

  return useMutation<CreateEnterpriseCondominiumMutationResponse, ResponseErrorConfig<Error>, { data: CreateEnterpriseCondominiumMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createEnterpriseCondominium(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}