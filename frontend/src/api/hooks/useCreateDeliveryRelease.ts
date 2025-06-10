import client from '@kubb/plugin-client/clients/axios'
import type { CreateDeliveryReleaseMutationRequest, CreateDeliveryReleaseMutationResponse } from '../models/CreateDeliveryRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createDeliveryRelease } from '../client/createDeliveryRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const createDeliveryReleaseMutationKey = () => [{ url: '/releases/delivery' }] as const

export type CreateDeliveryReleaseMutationKey = ReturnType<typeof createDeliveryReleaseMutationKey>

/**
 * {@link /releases/delivery}
 */
export function useCreateDeliveryRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateDeliveryReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateDeliveryReleaseMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateDeliveryReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createDeliveryReleaseMutationKey()

  return useMutation<CreateDeliveryReleaseMutationResponse, ResponseErrorConfig<Error>, { data: CreateDeliveryReleaseMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createDeliveryRelease(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}