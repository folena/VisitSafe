import client from '@kubb/plugin-client/clients/axios'
import type { CreateUnitMutationRequest, CreateUnitMutationResponse } from '../models/CreateUnit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createUnit } from '../client/createUnit.ts'
import { useMutation } from '@tanstack/react-query'

export const createUnitMutationKey = () => [{ url: '/units' }] as const

export type CreateUnitMutationKey = ReturnType<typeof createUnitMutationKey>

/**
 * {@link /units}
 */
export function useCreateUnit<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateUnitMutationResponse, ResponseErrorConfig<Error>, { data: CreateUnitMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateUnitMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createUnitMutationKey()

  return useMutation<CreateUnitMutationResponse, ResponseErrorConfig<Error>, { data: CreateUnitMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createUnit(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}