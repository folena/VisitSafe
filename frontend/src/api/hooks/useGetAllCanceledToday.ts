import client from '@kubb/plugin-client/clients/axios'
import type { GetAllCanceledTodayQueryResponse, GetAllCanceledTodayQueryParams } from '../models/GetAllCanceledToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getAllCanceledToday } from '../client/getAllCanceledToday.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getAllCanceledTodayQueryKey = (params?: GetAllCanceledTodayQueryParams) =>
  [{ url: '/releases/today/canceled' }, ...(params ? [params] : [])] as const

export type GetAllCanceledTodayQueryKey = ReturnType<typeof getAllCanceledTodayQueryKey>

export function getAllCanceledTodayQueryOptions(params?: GetAllCanceledTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getAllCanceledTodayQueryKey(params)
  return queryOptions<GetAllCanceledTodayQueryResponse, ResponseErrorConfig<Error>, GetAllCanceledTodayQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAllCanceledToday(params, config)
    },
  })
}

/**
 * @summary Listar liberações CANCELADAS de hoje do meu condomínio
 * {@link /releases/today/canceled}
 */
export function useGetAllCanceledToday<
  TData = GetAllCanceledTodayQueryResponse,
  TQueryData = GetAllCanceledTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllCanceledTodayQueryKey,
>(
  params?: GetAllCanceledTodayQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<GetAllCanceledTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllCanceledTodayQueryKey(params)

  const query = useQuery({
    ...(getAllCanceledTodayQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}