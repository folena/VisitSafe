import client from '@kubb/plugin-client/clients/axios'
import type { UpdateUnitMutationRequest, UpdateUnitMutationResponse } from '../models/UpdateUnit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateUnit } from '../client/updateUnit.ts'
import { useMutation } from '@tanstack/react-query'

export const updateUnitMutationKey = () => [{ url: '/units' }] as const

export type UpdateUnitMutationKey = ReturnType<typeof updateUnitMutationKey>

/**
 * {@link /units}
 */
export function useUpdateUnit<TContext>(
  options: {
    mutation?: UseMutationOptions<UpdateUnitMutationResponse, ResponseErrorConfig<Error>, { data: UpdateUnitMutationRequest }, TContext>
    client?: Partial<RequestConfig<UpdateUnitMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateUnitMutationKey()

  return useMutation<UpdateUnitMutationResponse, ResponseErrorConfig<Error>, { data: UpdateUnitMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return updateUnit(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}