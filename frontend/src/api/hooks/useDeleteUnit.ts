import client from '@kubb/plugin-client/clients/axios'
import type { DeleteUnitMutationResponse, DeleteUnitPathParams } from '../models/DeleteUnit.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteUnit } from '../client/deleteUnit.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteUnitMutationKey = () => [{ url: '/units/{id}' }] as const

export type DeleteUnitMutationKey = ReturnType<typeof deleteUnitMutationKey>

/**
 * {@link /units/:id}
 */
export function useDeleteUnit<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteUnitMutationResponse, ResponseErrorConfig<Error>, { id: DeleteUnitPathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteUnitMutationKey()

  return useMutation<DeleteUnitMutationResponse, ResponseErrorConfig<Error>, { id: DeleteUnitPathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteUnit(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}