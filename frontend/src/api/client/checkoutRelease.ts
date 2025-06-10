import client from '@/lib/api'
import type { CheckoutReleaseMutationResponse, CheckoutReleasePathParams } from '../models/CheckoutRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@/lib/api'

export function getCheckoutReleaseUrl(id: CheckoutReleasePathParams['id']) {
  return `http://localhost:8080/releases/${id}/checkout` as const
}

/**
 * {@link /releases/:id/checkout}
 */
export async function checkoutRelease(id: CheckoutReleasePathParams['id'], config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<CheckoutReleaseMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getCheckoutReleaseUrl(id).toString(),
    ...requestConfig,
  })
  return res.data
}