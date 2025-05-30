import client from '@kubb/plugin-client/clients/axios'
import type { GetAllCheckedInTodayQueryResponse, GetAllCheckedInTodayQueryParams } from '../models/GetAllCheckedInToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getAllCheckedInToday } from '../client/getAllCheckedInToday.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getAllCheckedInTodayQueryKey = (params?: GetAllCheckedInTodayQueryParams) =>
  [{ url: '/releases/today/checked-in' }, ...(params ? [params] : [])] as const

export type GetAllCheckedInTodayQueryKey = ReturnType<typeof getAllCheckedInTodayQueryKey>

export function getAllCheckedInTodayQueryOptions(params?: GetAllCheckedInTodayQueryParams, config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const queryKey = getAllCheckedInTodayQueryKey(params)
  return queryOptions<GetAllCheckedInTodayQueryResponse, ResponseErrorConfig<Error>, GetAllCheckedInTodayQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getAllCheckedInToday(params, config)
    },
  })
}

/**
 * @summary Listar liberações CHECKED-IN de hoje do meu condomínio
 * {@link /releases/today/checked-in}
 */
export function useGetAllCheckedInToday<
  TData = GetAllCheckedInTodayQueryResponse,
  TQueryData = GetAllCheckedInTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllCheckedInTodayQueryKey,
>(
  params?: GetAllCheckedInTodayQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<GetAllCheckedInTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllCheckedInTodayQueryKey(params)

  const query = useQuery({
    ...(getAllCheckedInTodayQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}