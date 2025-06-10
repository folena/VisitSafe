import client from '@kubb/plugin-client/clients/axios'
import type { DeleteFamilyReleaseMutationResponse, DeleteFamilyReleasePathParams } from '../models/DeleteFamilyRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteFamilyRelease } from '../client/deleteFamilyRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteFamilyReleaseMutationKey = () => [{ url: '/releases/family/{id}' }] as const

export type DeleteFamilyReleaseMutationKey = ReturnType<typeof deleteFamilyReleaseMutationKey>

/**
 * {@link /releases/family/:id}
 */
export function useDeleteFamilyRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteFamilyReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteFamilyReleasePathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteFamilyReleaseMutationKey()

  return useMutation<DeleteFamilyReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteFamilyReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteFamilyRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}