import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
      baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:3000/api/v1/',
            prepareHeaders: (headers, { getState }) => {
                  const token = getState().auth.token;
                  if (token) {
                        headers.set('authorization', `Bearer ${token}`)
                  }
                  return headers;
            }     
      }),
      tagTypes: ['Current', 'Archived', 'Completed'],
      endpoints: (builder) => ({
            register: builder.mutation({
                  query: (credentials) => ({
                        url: 'auth/register',
                        method: 'POST',
                        body: credentials
                  })
            }),
            login: builder.mutation({
                 query: (credentials) => ({
                        url: 'auth/login',
                        method: 'POST',
                        body: credentials,
                  }),
            }) 
      })
})

export const { useRegisterMutation, useLoginMutation } = api;
