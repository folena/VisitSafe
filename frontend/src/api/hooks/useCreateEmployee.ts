import client from '@kubb/plugin-client/clients/axios'
import type { CreateEmployeeMutationRequest, CreateEmployeeMutationResponse } from '../models/CreateEmployee.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createEmployee } from '../client/createEmployee.ts'
import { useMutation } from '@tanstack/react-query'

export const createEmployeeMutationKey = () => [{ url: '/users/create/employee' }] as const

export type CreateEmployeeMutationKey = ReturnType<typeof createEmployeeMutationKey>

/**
 * @summary Create an Employee User
 * {@link /users/create/employee}
 */
export function useCreateEmployee<TContext>(
  options: {
    mutation?: UseMutationOptions<CreateEmployeeMutationResponse, ResponseErrorConfig<Error>, { data?: CreateEmployeeMutationRequest }, TContext>
    client?: Partial<RequestConfig<CreateEmployeeMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createEmployeeMutationKey()

  return useMutation<CreateEmployeeMutationResponse, ResponseErrorConfig<Error>, { data?: CreateEmployeeMutationRequest }, TContext>({
    mutationFn: async ({ data }) => {
      return createEmployee(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}