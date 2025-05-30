import client from '@kubb/plugin-client/clients/axios'
import type {
  UpdateDeliveryReleaseMutationRequest,
  UpdateDeliveryReleaseMutationResponse,
  UpdateDeliveryReleasePathParams,
} from '../models/UpdateDeliveryRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateDeliveryRelease } from '../client/updateDeliveryRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const updateDeliveryReleaseMutationKey = () => [{ url: '/releases/delivery/{id}' }] as const

export type UpdateDeliveryReleaseMutationKey = ReturnType<typeof updateDeliveryReleaseMutationKey>

/**
 * {@link /releases/delivery/:id}
 */
export function useUpdateDeliveryRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateDeliveryReleaseMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateDeliveryReleasePathParams['id']; data: UpdateDeliveryReleaseMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateDeliveryReleaseMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateDeliveryReleaseMutationKey()

  return useMutation<
    UpdateDeliveryReleaseMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateDeliveryReleasePathParams['id']; data: UpdateDeliveryReleaseMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, data }) => {
      return updateDeliveryRelease(id, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}