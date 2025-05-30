import client from '@kubb/plugin-client/clients/axios'
import type { DeleteDeliveryReleaseMutationResponse, DeleteDeliveryReleasePathParams } from '../models/DeleteDeliveryRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteDeliveryRelease } from '../client/deleteDeliveryRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteDeliveryReleaseMutationKey = () => [{ url: '/releases/delivery/{id}' }] as const

export type DeleteDeliveryReleaseMutationKey = ReturnType<typeof deleteDeliveryReleaseMutationKey>

/**
 * {@link /releases/delivery/:id}
 */
export function useDeleteDeliveryRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<DeleteDeliveryReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteDeliveryReleasePathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteDeliveryReleaseMutationKey()

  return useMutation<DeleteDeliveryReleaseMutationResponse, ResponseErrorConfig<Error>, { id: DeleteDeliveryReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return deleteDeliveryRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}