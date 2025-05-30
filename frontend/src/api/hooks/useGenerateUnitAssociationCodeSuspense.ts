import client from '@kubb/plugin-client/clients/axios'
import type { GenerateUnitAssociationCodeQueryResponse, GenerateUnitAssociationCodePathParams } from '../models/GenerateUnitAssociationCode.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { generateUnitAssociationCode } from '../client/generateUnitAssociationCode.ts'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const generateUnitAssociationCodeSuspenseQueryKey = (unitId: GenerateUnitAssociationCodePathParams['unitId']) =>
  [{ url: '/units/associate/generate/:unitId', params: { unitId: unitId } }] as const

export type GenerateUnitAssociationCodeSuspenseQueryKey = ReturnType<typeof generateUnitAssociationCodeSuspenseQueryKey>

export function generateUnitAssociationCodeSuspenseQueryOptions(
  unitId: GenerateUnitAssociationCodePathParams['unitId'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = generateUnitAssociationCodeSuspenseQueryKey(unitId)
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
export function useGenerateUnitAssociationCodeSuspense<
  TData = GenerateUnitAssociationCodeQueryResponse,
  TQueryData = GenerateUnitAssociationCodeQueryResponse,
  TQueryKey extends QueryKey = GenerateUnitAssociationCodeSuspenseQueryKey,
>(
  unitId: GenerateUnitAssociationCodePathParams['unitId'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GenerateUnitAssociationCodeQueryResponse, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? generateUnitAssociationCodeSuspenseQueryKey(unitId)

  const query = useSuspenseQuery({
    ...(generateUnitAssociationCodeSuspenseQueryOptions(unitId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}