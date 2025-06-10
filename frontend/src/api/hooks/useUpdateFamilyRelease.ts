import client from '@kubb/plugin-client/clients/axios'
import type { UpdateFamilyReleaseMutationRequest, UpdateFamilyReleaseMutationResponse, UpdateFamilyReleasePathParams } from '../models/UpdateFamilyRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateFamilyRelease } from '../client/updateFamilyRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const updateFamilyReleaseMutationKey = () => [{ url: '/releases/family/{id}' }] as const

export type UpdateFamilyReleaseMutationKey = ReturnType<typeof updateFamilyReleaseMutationKey>

/**
 * {@link /releases/family/:id}
 */
export function useUpdateFamilyRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateFamilyReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateFamilyReleasePathParams['id']; data: UpdateFamilyReleaseMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateFamilyReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateFamilyReleaseMutationKey()

  return useMutation<
    UpdateFamilyReleaseMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateFamilyReleasePathParams['id']; data: UpdateFamilyReleaseMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateFamilyRelease(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}