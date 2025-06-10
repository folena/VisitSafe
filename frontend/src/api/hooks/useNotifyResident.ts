import client from '@kubb/plugin-client/clients/axios'
import type { NotifyResidentMutationResponse, NotifyResidentPathParams } from '../models/NotifyResident.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { notifyResident } from '../client/notifyResident.ts'
import { useMutation } from '@tanstack/react-query'

export const notifyResidentMutationKey = () => [{ url: '/releases/service-provider/{id}/notify' }] as const

export type NotifyResidentMutationKey = ReturnType<typeof notifyResidentMutationKey>

/**
 * {@link /releases/service-provider/:id/notify}
 */
export function useNotifyResident<TContext>(
  options: {
    mutation?: UseMutationOptions<NotifyResidentMutationResponse, ResponseErrorConfig<Error>, { id: NotifyResidentPathParams['id'] }, TContext>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? notifyResidentMutationKey()

  return useMutation<NotifyResidentMutationResponse, ResponseErrorConfig<Error>, { id: NotifyResidentPathParams['id'] }, TContext>({
    mutationFn: async ({ id }) => {
      return notifyResident(id, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}