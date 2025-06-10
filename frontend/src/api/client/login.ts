import client from '@/lib/api'
import type { LoginMutationRequest, LoginMutationResponse } from '../models/Login.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getLoginUrl() {
  return `http://localhost:8080/auth/login` as const
}

/**
 * {@link /auth/login}
 */
export async function login(data?: LoginMutationRequest, config: Partial<RequestConfig<LoginMutationRequest>> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<LoginMutationResponse, ResponseErrorConfig<Error>, LoginMutationRequest>({
    method: 'POST',
    url: getLoginUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}