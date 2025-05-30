import client from '@kubb/plugin-client/clients/axios'
import type { CheckoutReleaseMutationResponse, CheckoutReleasePathParams } from '../models/CheckoutRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { checkoutRelease } from '../client/checkoutRelease.ts'
import { useMutation } from '@tanstack/react-query'

export const checkoutReleaseMutationKey = () => [{ url: '/releases/{id}/checkout' }] as const

export type CheckoutReleaseMutationKey = ReturnType<typeof checkoutReleaseMutationKey>

/**
 * {@link /releases/:id/checkout}
 */
export function useCheckoutRelease<TContext>(
  options: {
    mutation?: UseMutationOptions<CheckoutReleaseMutationResponse, ResponseErrorConfig<Error>, { id: CheckoutReleasePathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? checkoutReleaseMutationKey()

  return useMutation<CheckoutReleaseMutationResponse, ResponseErrorConfig<Error>, { id: CheckoutReleasePathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return checkoutRelease(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}