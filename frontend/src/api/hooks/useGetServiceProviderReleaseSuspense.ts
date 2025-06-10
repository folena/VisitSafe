import client from '@kubb/plugin-client/clients/axios'
import type { GetServiceProviderReleaseQueryResponse, GetServiceProviderReleasePathParams } from '../models/GetServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getServiceProviderRelease } from '../client/getServiceProviderRelease.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getServiceProviderReleaseSuspenseQueryKey = (id: GetServiceProviderReleasePathParams['id']) =>
  [{ url: '/releases/service-provider/:id', params: { id: id } }] as const

export type GetServiceProviderReleaseSuspenseQueryKey = ReturnType<typeof getServiceProviderReleaseSuspenseQueryKey>

export function getServiceProviderReleaseSuspenseQueryOptions(
  id: GetServiceProviderReleasePathParams['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getServiceProviderReleaseSuspenseQueryKey(id)
  return queryOptions<GetServiceProviderReleaseQueryResponse, ResponseErrorConfig<Error>, GetServiceProviderReleaseQueryResponse, typeof queryKey>({
    enabled: !!id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getServiceProviderRelease(id, config)
    },
  })
}

/**
 * {@link /releases/service-provider/:id}
 */
export function useGetServiceProviderReleaseSuspense<
  TData = GetServiceProviderReleaseQueryResponse,
  TQueryData = GetServiceProviderReleaseQueryResponse,
  TQueryKey extends QueryKey = GetServiceProviderReleaseSuspenseQueryKey,
>(
  id: GetServiceProviderReleasePathParams['id'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetServiceProviderReleaseQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getServiceProviderReleaseSuspenseQueryKey(id)

  const query = useSuspenseQuery({
    ...(getServiceProviderReleaseSuspenseQueryOptions(id, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}