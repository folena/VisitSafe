import client from '@kubb/plugin-client/clients/axios'
import type { GetAllCheckedOutTodayQueryResponse, GetAllCheckedOutTodayQueryParams } from '../models/GetAllCheckedOutToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getAllCheckedOutToday } from '../client/getAllCheckedOutToday.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getAllCheckedOutTodayQueryKey = (params?: GetAllCheckedOutTodayQueryParams) =>
  [{ url: '/releases/today/checked-out' }, ...(params ? [params] : [])] as const

export type GetAllCheckedOutTodayQueryKey = ReturnType<typeof getAllCheckedOutTodayQueryKey>

export function getAllCheckedOutTodayQueryOptions(params?: GetAllCheckedOutTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getAllCheckedOutTodayQueryKey(params)
  return queryOptions<GetAllCheckedOutTodayQueryResponse, ResponseErrorConfig<Error>, GetAllCheckedOutTodayQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAllCheckedOutToday(params, config)
    },
  })
}

/**
 * @summary Listar liberações FINALIZADAS de hoje do meu condomínio
 * {@link /releases/today/checked-out}
 */
export function useGetAllCheckedOutToday<
  TData = GetAllCheckedOutTodayQueryResponse,
  TQueryData = GetAllCheckedOutTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllCheckedOutTodayQueryKey,
>(
  params?: GetAllCheckedOutTodayQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<GetAllCheckedOutTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllCheckedOutTodayQueryKey(params)

  const query = useQuery({
    ...(getAllCheckedOutTodayQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}