/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type FriendRequestDto = {
  requestId: string;
};

export type FriendStatus =
  | 'ACCEPTED'
  | 'PENDING'
  | 'REJECTED';

export type RemoveFriendDto = {
  friendId: string;
};

export type SearchUserDto = {
  identifier: string;
};

export type SendFriendRequestDto = {
  toId: string;
};

export type UserRole =
  | 'ADMIN'
  | 'REGULAR';

export type DeleteUserMutationVariables = Exact<{
  input: string;
}>;


export type DeleteUserMutation = { deleteUser: string };

export type AcceptFriendRequestMutationVariables = Exact<{
  input: FriendRequestDto;
}>;


export type AcceptFriendRequestMutation = { acceptFriendRequest: boolean };

export type RejectFriendRequestMutationVariables = Exact<{
  input: FriendRequestDto;
}>;


export type RejectFriendRequestMutation = { rejectFriendRequest: boolean };

export type SendFriendRequestMutationVariables = Exact<{
  input: SendFriendRequestDto;
}>;


export type SendFriendRequestMutation = { sendFriendRequest: boolean };

export type RemoveFriendMutationVariables = Exact<{
  input: RemoveFriendDto;
}>;


export type RemoveFriendMutation = { removeFriend: boolean };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { Admin: string, getAllUsers: { count: number, users: Array<{ id: string, avatar: string | null, firstName: string | null, lastName: string | null, email: string, role: UserRole, publicId: string, username: string, createdAt: string }> } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { avatar: string | null, firstName: string | null, id: string, lastName: string | null, publicId: string, username: string, createdAt: string, email: string, hasPassword: boolean, role: UserRole }, getFriends: Array<{ id: string, avatar: string | null, firstName: string | null, lastName: string | null, publicId: string, username: string, role: UserRole }>, getFriendRequests: Array<{ id: string, status: FriendStatus, from: { id: string, avatar: string | null, publicId: string, username: string, role: UserRole }, to: { id: string, avatar: string | null, publicId: string, username: string, role: UserRole } }> };

export type SearchUserQueryVariables = Exact<{
  input: SearchUserDto;
}>;


export type SearchUserQuery = { searchUser: Array<{ id: string, username: string, avatar: string | null, publicId: string, role: UserRole }> };

export type GetUserQueryVariables = Exact<{
  id: string;
}>;


export type GetUserQuery = { getUser: { id: string, avatar: string | null, firstName: string | null, lastName: string | null, publicId: string, username: string, createdAt: string, role: UserRole } };

export type GetMyHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyHistoryQuery = { getMyHistory: Array<{ id: string, roomId: string, finishedAt: string | null, winnerId: string | null, players: Array<{ id: string, winner: boolean, userId: string, user: { id: string, username: string } }> }> };

export type GetUserHistoryQueryVariables = Exact<{
  id: string;
}>;


export type GetUserHistoryQuery = { getUserHistory: Array<{ id: string, roomId: string, finishedAt: string | null, winnerId: string | null, players: Array<{ id: string, winner: boolean, userId: string, user: { id: string, username: string } }> }> };

export type GetMyStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyStatsQuery = { getMyStats: { losses: number, totalGames: number, winRate: number, winStreak: number, wins: number } };

export type GetUserStatsQueryVariables = Exact<{
  id: string;
}>;


export type GetUserStatsQuery = { getUserStats: { losses: number, totalGames: number, winRate: number, winStreak: number, wins: number } };


export const DeleteUserDocument = gql`
    mutation DeleteUser($input: String!) {
  deleteUser(userId: $input)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($input: FriendRequestDto!) {
  acceptFriendRequest(input: $input)
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const RejectFriendRequestDocument = gql`
    mutation RejectFriendRequest($input: FriendRequestDto!) {
  rejectFriendRequest(input: $input)
}
    `;
export type RejectFriendRequestMutationFn = Apollo.MutationFunction<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>;

/**
 * __useRejectFriendRequestMutation__
 *
 * To run a mutation, you first call `useRejectFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectFriendRequestMutation, { data, loading, error }] = useRejectFriendRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRejectFriendRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>(RejectFriendRequestDocument, options);
      }
export type RejectFriendRequestMutationHookResult = ReturnType<typeof useRejectFriendRequestMutation>;
export type RejectFriendRequestMutationResult = Apollo.MutationResult<RejectFriendRequestMutation>;
export type RejectFriendRequestMutationOptions = Apollo.BaseMutationOptions<RejectFriendRequestMutation, RejectFriendRequestMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($input: SendFriendRequestDto!) {
  sendFriendRequest(input: $input)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($input: RemoveFriendDto!) {
  removeFriend(input: $input)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, options);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    count
    users {
      id
      avatar
      firstName
      lastName
      email
      role
      publicId
      username
      createdAt
    }
  }
  Admin
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
// @ts-ignore
export function useGetAllUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export function useGetAllUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetAllUsersQuery | undefined, GetAllUsersQueryVariables>;
export function useGetAllUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    avatar
    firstName
    id
    lastName
    publicId
    username
    createdAt
    email
    hasPassword
    role
  }
  getFriends {
    id
    avatar
    firstName
    lastName
    firstName
    publicId
    username
    role
  }
  getFriendRequests {
    id
    status
    from {
      id
      avatar
      publicId
      username
      role
    }
    to {
      id
      avatar
      publicId
      username
      role
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
// @ts-ignore
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMeQuery, GetMeQueryVariables>;
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMeQuery | undefined, GetMeQueryVariables>;
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const SearchUserDocument = gql`
    query SearchUser($input: SearchUserDto!) {
  searchUser(input: $input) {
    id
    username
    avatar
    publicId
    role
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables> & ({ variables: SearchUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
// @ts-ignore
export function useSearchUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SearchUserQuery, SearchUserQueryVariables>;
export function useSearchUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SearchUserQuery | undefined, SearchUserQueryVariables>;
export function useSearchUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserSuspenseQueryHookResult = ReturnType<typeof useSearchUserSuspenseQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUser(id: $id) {
    id
    avatar
    firstName
    lastName
    publicId
    username
    createdAt
    role
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
// @ts-ignore
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserQuery, GetUserQueryVariables>;
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserQuery | undefined, GetUserQueryVariables>;
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetMyHistoryDocument = gql`
    query GetMyHistory {
  getMyHistory {
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
 * __useGetMyHistoryQuery__
 *
 * To run a query within a React component, call `useGetMyHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyHistoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyHistoryQuery, GetMyHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyHistoryQuery, GetMyHistoryQueryVariables>(GetMyHistoryDocument, options);
      }
export function useGetMyHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyHistoryQuery, GetMyHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyHistoryQuery, GetMyHistoryQueryVariables>(GetMyHistoryDocument, options);
        }
// @ts-ignore
export function useGetMyHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMyHistoryQuery, GetMyHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyHistoryQuery, GetMyHistoryQueryVariables>;
export function useGetMyHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyHistoryQuery, GetMyHistoryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyHistoryQuery | undefined, GetMyHistoryQueryVariables>;
export function useGetMyHistorySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyHistoryQuery, GetMyHistoryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyHistoryQuery, GetMyHistoryQueryVariables>(GetMyHistoryDocument, options);
        }
export type GetMyHistoryQueryHookResult = ReturnType<typeof useGetMyHistoryQuery>;
export type GetMyHistoryLazyQueryHookResult = ReturnType<typeof useGetMyHistoryLazyQuery>;
export type GetMyHistorySuspenseQueryHookResult = ReturnType<typeof useGetMyHistorySuspenseQuery>;
export type GetMyHistoryQueryResult = Apollo.QueryResult<GetMyHistoryQuery, GetMyHistoryQueryVariables>;
export const GetUserHistoryDocument = gql`
    query GetUserHistory($id: String!) {
  getUserHistory(id: $id) {
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserHistoryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserHistoryQuery, GetUserHistoryQueryVariables> & ({ variables: GetUserHistoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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
export const GetMyStatsDocument = gql`
    query getMyStats {
  getMyStats {
    losses
    totalGames
    winRate
    winStreak
    wins
  }
}
    `;

/**
 * __useGetMyStatsQuery__
 *
 * To run a query within a React component, call `useGetMyStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyStatsQuery, GetMyStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyStatsQuery, GetMyStatsQueryVariables>(GetMyStatsDocument, options);
      }
export function useGetMyStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyStatsQuery, GetMyStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyStatsQuery, GetMyStatsQueryVariables>(GetMyStatsDocument, options);
        }
// @ts-ignore
export function useGetMyStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMyStatsQuery, GetMyStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyStatsQuery, GetMyStatsQueryVariables>;
export function useGetMyStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyStatsQuery, GetMyStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyStatsQuery | undefined, GetMyStatsQueryVariables>;
export function useGetMyStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyStatsQuery, GetMyStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyStatsQuery, GetMyStatsQueryVariables>(GetMyStatsDocument, options);
        }
export type GetMyStatsQueryHookResult = ReturnType<typeof useGetMyStatsQuery>;
export type GetMyStatsLazyQueryHookResult = ReturnType<typeof useGetMyStatsLazyQuery>;
export type GetMyStatsSuspenseQueryHookResult = ReturnType<typeof useGetMyStatsSuspenseQuery>;
export type GetMyStatsQueryResult = Apollo.QueryResult<GetMyStatsQuery, GetMyStatsQueryVariables>;
export const GetUserStatsDocument = gql`
    query GetUserStats($id: String!) {
  getUserStats(id: $id) {
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserStatsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserStatsQuery, GetUserStatsQueryVariables> & ({ variables: GetUserStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
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