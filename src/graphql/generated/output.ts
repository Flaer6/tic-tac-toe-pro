/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type GamePlayer = {
  __typename?: 'GamePlayer';
  createdAt: Scalars['DateTime']['output'];
  gameId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  symbol: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
  winner: Scalars['Boolean']['output'];
};

export type GameStatistic = {
  __typename?: 'GameStatistic';
  board?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  players: Array<GamePlayer>;
  roomId: Scalars['ID']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  winnerId?: Maybe<Scalars['ID']['output']>;
};

export type GameUserStats = {
  __typename?: 'GameUserStats';
  losses: Scalars['Int']['output'];
  totalGames: Scalars['Int']['output'];
  winRate: Scalars['Float']['output'];
  winStreak: Scalars['Int']['output'];
  wins: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getGameHistory: Array<GameStatistic>;
  getUserStats: GameUserStats;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  publicId: Scalars['Int']['output'];
  stats?: Maybe<GameUserStats>;
  username: Scalars['String']['output'];
  winStreak?: Maybe<Scalars['Int']['output']>;
};

export type GetUserHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserHistoryQuery = { getGameHistory: Array<{ id: string, roomId: string, finishedAt: string | null, winnerId: string | null, players: Array<{ id: string, winner: boolean, userId: string, user: { id: string, username: string } }> }> };

export type GetUserStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserStatsQuery = { getUserStats: { losses: number, totalGames: number, winRate: number, winStreak: number, wins: number } };


export const GetUserHistoryDocument = gql`
    query GetUserHistory {
  getGameHistory {
    id
    roomId
    finishedAt
    winnerId
    players {
      id
      winner
      userId
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetUserHistoryQuery__
 *
 * To run a query within a React component, call `useGetUserHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserHistoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserHistoryQuery, GetUserHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserHistoryQuery, GetUserHistoryQueryVariables>(GetUserHistoryDocument, options);
      }
export function useGetUserHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserHistoryQuery, GetUserHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserHistoryQuery, GetUserHistoryQueryVariables>(GetUserHistoryDocument, options);
        }
// @ts-ignore
export function useGetUserHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUserHistoryQuery, GetUserHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserHistoryQuery, GetUserHistoryQueryVariables>;
export function useGetUserHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserHistoryQuery, GetUserHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserHistoryQuery | undefined, GetUserHistoryQueryVariables>;
export function useGetUserHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserHistoryQuery, GetUserHistoryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserHistoryQuery, GetUserHistoryQueryVariables>(GetUserHistoryDocument, options);
        }
export type GetUserHistoryQueryHookResult = ReturnType<typeof useGetUserHistoryQuery>;
export type GetUserHistoryLazyQueryHookResult = ReturnType<typeof useGetUserHistoryLazyQuery>;
export type GetUserHistorySuspenseQueryHookResult = ReturnType<typeof useGetUserHistorySuspenseQuery>;
export type GetUserHistoryQueryResult = Apollo.QueryResult<GetUserHistoryQuery, GetUserHistoryQueryVariables>;
export const GetUserStatsDocument = gql`
    query getUserStats {
  getUserStats {
    losses
    totalGames
    winRate
    winStreak
    wins
  }
}
    `;

/**
 * __useGetUserStatsQuery__
 *
 * To run a query within a React component, call `useGetUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserStatsQuery, GetUserStatsQueryVariables>(GetUserStatsDocument, options);
      }
export function useGetUserStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserStatsQuery, GetUserStatsQueryVariables>(GetUserStatsDocument, options);
        }
// @ts-ignore
export function useGetUserStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserStatsQuery, GetUserStatsQueryVariables>;
export function useGetUserStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserStatsQuery | undefined, GetUserStatsQueryVariables>;
export function useGetUserStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserStatsQuery, GetUserStatsQueryVariables>(GetUserStatsDocument, options);
        }
export type GetUserStatsQueryHookResult = ReturnType<typeof useGetUserStatsQuery>;
export type GetUserStatsLazyQueryHookResult = ReturnType<typeof useGetUserStatsLazyQuery>;
export type GetUserStatsSuspenseQueryHookResult = ReturnType<typeof useGetUserStatsSuspenseQuery>;
export type GetUserStatsQueryResult = Apollo.QueryResult<GetUserStatsQuery, GetUserStatsQueryVariables>;