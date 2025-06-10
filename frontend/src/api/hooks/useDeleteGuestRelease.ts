import client from '@kubb/plugin-client/clients/axios'
import type { DeleteGuestReleaseMutationResponse, DeleteGuestReleasePathParams } from '../models/DeleteGuestRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteGuestRelease } from '../client/deleteGuestRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteGuestReleaseMutationKey = () => [{ url: '/releases/guest/{id}' }] as const

export type DeleteGuestReleaseMutationKey = ReturnType<typeof deleteGuestReleaseMutationKey>

/**
 * {@link /releases/guest/:id}
 */
export function useDeleteGuestRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteGuestReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteGuestReleasePathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteGuestReleaseMutationKey()

  return useMutation<DeleteGuestReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteGuestReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteGuestRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}