import client from '@kubb/plugin-client/clients/axios'
import type { CreateFamilyReleaseMutationRequest, CreateFamilyReleaseMutationResponse } from '../models/CreateFamilyRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createFamilyRelease } from '../client/createFamilyRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const createFamilyReleaseMutationKey = () => [{ url: '/releases/family' }] as const

export type CreateFamilyReleaseMutationKey = ReturnType<typeof createFamilyReleaseMutationKey>

/**
 * {@link /releases/family}
 */
export function useCreateFamilyRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateFamilyReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateFamilyReleaseMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateFamilyReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createFamilyReleaseMutationKey()

  return useMutation<CreateFamilyReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateFamilyReleaseMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createFamilyRelease(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}