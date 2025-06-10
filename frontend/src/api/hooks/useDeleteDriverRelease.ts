import client from '@kubb/plugin-client/clients/axios'
import type { DeleteDriverReleaseMutationResponse, DeleteDriverReleasePathParams } from '../models/DeleteDriverRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteDriverRelease } from '../client/deleteDriverRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteDriverReleaseMutationKey = () => [{ url: '/releases/driver/{id}' }] as const

export type DeleteDriverReleaseMutationKey = ReturnType<typeof deleteDriverReleaseMutationKey>

/**
 * {@link /releases/driver/:id}
 */
export function useDeleteDriverRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteDriverReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteDriverReleasePathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteDriverReleaseMutationKey()

  return useMutation<DeleteDriverReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteDriverReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteDriverRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}