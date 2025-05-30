import client from '@kubb/plugin-client/clients/axios'
import type { CreateResidentialCondominiumMutationRequest, CreateResidentialCondominiumMutationResponse } from '../models/CreateResidentialCondominium.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createResidentialCondominium } from '../client/createResidentialCondominium.ts'
import { useMutation } from '@tanstack/react-query'

export const createResidentialCondominiumMutationKey = () => [{ url: '/condominiums/create/residential' }] as const

export type CreateResidentialCondominiumMutationKey = ReturnType<typeof createResidentialCondominiumMutationKey>

/**
 * @summary Create a Residential Condominium
 * {@link /condominiums/create/residential}
 */
export function useCreateResidentialCondominium<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateResidentialCondominiumMutationResponse,
      ResponseErrorConfig<Error>,
      { data: CreateResidentialCondominiumMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateResidentialCondominiumMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createResidentialCondominiumMutationKey()

  return useMutation<CreateResidentialCondominiumMutationResponse, ResponseErrorConfig<Error>, { data: CreateResidentialCondominiumMutationRequest }, TContext>(
    {
      mutationFn: async ({ data }) => {
        return createResidentialCondominium(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
  )
}