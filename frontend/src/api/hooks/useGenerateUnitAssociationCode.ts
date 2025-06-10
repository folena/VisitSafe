import client from '@kubb/plugin-client/clients/axios'
import type { GenerateUnitAssociationCodeQueryResponse, GenerateUnitAssociationCodePathParams } from '../models/GenerateUnitAssociationCode.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { generateUnitAssociationCode } from '../client/generateUnitAssociationCode.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const generateUnitAssociationCodeQueryKey = (unitId: GenerateUnitAssociationCodePathParams['unitId']) =>
  [{ url: '/units/associate/generate/:unitId', params: { unitId: unitId } }] as const

export type GenerateUnitAssociationCodeQueryKey = ReturnType<typeof generateUnitAssociationCodeQueryKey>

export function generateUnitAssociationCodeQueryOptions(
  unitId: GenerateUnitAssociationCodePathParams['unitId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = generateUnitAssociationCodeQueryKey(unitId)
  return queryOptions<GenerateUnitAssociationCodeQueryResponse, ResponseErrorConfig<Error>, GenerateUnitAssociationCodeQueryResponse, typeof queryKey>({
    enabled: !!unitId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return generateUnitAssociationCode(unitId, config)
    },
  })
}

/**
 * @description Returns a valid code to associate a unit. If one already exists and is valid, it will be returned.
 * @summary Generate or retrieve an active association code for a unit
 * {@link /units/associate/generate/:unitId}
 */
export function useGenerateUnitAssociationCode<
  TData = GenerateUnitAssociationCodeQueryResponse,
  TQueryData = GenerateUnitAssociationCodeQueryResponse,
  TQueryKey extends QueryKey = GenerateUnitAssociationCodeQueryKey,
>(
  unitId: GenerateUnitAssociationCodePathParams['unitId'],
  options: {
    query?: Partial<QueryObserverOptions<GenerateUnitAssociationCodeQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? generateUnitAssociationCodeQueryKey(unitId)

  const query = useQuery({
    ...(generateUnitAssociationCodeQueryOptions(unitId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}