import client from '@kubb/plugin-client/clients/axios'
import type { GetAllCanceledTodayQueryResponse, GetAllCanceledTodayQueryParams } from '../models/GetAllCanceledToday.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { getAllCanceledToday } from '../client/getAllCanceledToday.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getAllCanceledTodaySuspenseQueryKey = (params?: GetAllCanceledTodayQueryParams) =>
  [{ url: '/releases/today/canceled' }, ...(params ? [params] : [])] as const

export type GetAllCanceledTodaySuspenseQueryKey = ReturnType<typeof getAllCanceledTodaySuspenseQueryKey>

export function getAllCanceledTodaySuspenseQueryOptions(
  params?: GetAllCanceledTodayQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getAllCanceledTodaySuspenseQueryKey(params)
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
export function useGetAllCanceledTodaySuspense<
  TData = GetAllCanceledTodayQueryResponse,
  TQueryData = GetAllCanceledTodayQueryResponse,
  TQueryKey extends QueryKey = GetAllCanceledTodaySuspenseQueryKey,
>(
  params?: GetAllCanceledTodayQueryParams,
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetAllCanceledTodayQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getAllCanceledTodaySuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(getAllCanceledTodaySuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}