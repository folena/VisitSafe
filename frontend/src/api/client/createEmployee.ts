import client from '@/lib/api'
import type { CreateEmployeeMutationRequest, CreateEmployeeMutationResponse } from '../models/CreateEmployee.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCreateEmployeeUrl() {
  return `http://localhost:8080/users/create/employee` as const
}

/**
 * @summary Create an Employee User
 * {@link /users/create/employee}
 */
export async function createEmployee(
  data?: CreateEmployeeMutationRequest,
  config: Partial<RequestConfig<CreateEmployeeMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CreateEmployeeMutationResponse, ResponseErrorConfig<Error>, CreateEmployeeMutationRequest>({
    method: 'POST',
    url: getCreateEmployeeUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}