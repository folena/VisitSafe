import client from '@kubb/plugin-client/clients/axios'
import type { NotifyResident1MutationResponse, NotifyResident1PathParams } from '../models/NotifyResident1.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { notifyResident1 } from '../client/notifyResident1.ts'
import { useMutation } from '@tanstack/react-query'

export const notifyResident1MutationKey = () => [{ url: '/releases/service-provider-exception/{id}/notify-resident' }] as const

export type NotifyResident1MutationKey = ReturnType<typeof notifyResident1MutationKey>

/**
 * @summary Notify resident about late exit
 * {@link /releases/service-provider-exception/:id/notify-resident}
 */
export function useNotifyResident1<TContext>(
  options: {
    mutation?: UseMutationOptions<NotifyResident1MutationResponse, ResponseErrorConfig<Error>, { id: NotifyResident1PathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? notifyResident1MutationKey()

  return useMutation<NotifyResident1MutationResponse, ResponseErrorConfig<Error>, { id: NotifyResident1PathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return notifyResident1(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}