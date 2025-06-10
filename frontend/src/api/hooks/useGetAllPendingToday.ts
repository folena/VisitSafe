import client from '@kubb/plugin-client/clients/axios'
import type { GetAllPendingTodayQueryResponse, GetAllPendingTodayQueryParams } from '../models/GetAllPendingToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getAllPendingToday } from '../client/getAllPendingToday.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getAllPendingTodayQueryKey = (params?: GetAllPendingTodayQueryParams) => [{ url: '/releases/today/pending' }, ...(params ? [params] : [])] as const

export type GetAllPendingTodayQueryKey = ReturnType<typeof getAllPendingTodayQueryKey>

export function getAllPendingTodayQueryOptions(params?: GetAllPendingTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getAllPendingTodayQueryKey(params)
  return queryOptions<GetAllPendingTodayQueryResponse, ResponseErrorConfig<Error>, GetAllPendingTodayQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAllPendingToday(params, config)
    },
  })
}

/**
 * @summary Listar liberações PENDENTES de hoje do meu condomínio
 * {@link /releases/today/pending}
 */
export function useGetAllPendingToday<
  TData = GetAllPendingTodayQueryResponse,
  TQueryData = GetAllPendingTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllPendingTodayQueryKey,
>(
  params?: GetAllPendingTodayQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<GetAllPendingTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllPendingTodayQueryKey(params)

  const query = useQuery({
    ...(getAllPendingTodayQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}