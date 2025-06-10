import client from '@kubb/plugin-client/clients/axios'
import type { GetServiceProviderReleaseQueryResponse, GetServiceProviderReleasePathParams } from '../models/GetServiceProviderRelease.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getServiceProviderRelease } from '../client/getServiceProviderRelease.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getServiceProviderReleaseQueryKey = (id: GetServiceProviderReleasePathParams['id']) =>
  [{ url: '/releases/service-provider/:id', params: { id: id } }] as const

export type GetServiceProviderReleaseQueryKey = ReturnType<typeof getServiceProviderReleaseQueryKey>

export function getServiceProviderReleaseQueryOptions(
  id: GetServiceProviderReleasePathParams['id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getServiceProviderReleaseQueryKey(id)
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
export function useGetServiceProviderRelease<
  TData = GetServiceProviderReleaseQueryResponse,
  TQueryData = GetServiceProviderReleaseQueryResponse,
  TQueryKey extends QueryKey = GetServiceProviderReleaseQueryKey,
>(
  id: GetServiceProviderReleasePathParams['id'],
  options: {
    query?: Partial<QueryObserverOptions<GetServiceProviderReleaseQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getServiceProviderReleaseQueryKey(id)

  const query = useQuery({
    ...(getServiceProviderReleaseQueryOptions(id, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}