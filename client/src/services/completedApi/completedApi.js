import { api } from '../api/api';

export const extendedApiCompleted = api.injectEndpoints({
      endpoints: (builder) => ({
            getCompletedProjects: builder.query({
                  query: (args) => {
                        const { search, sort } = args;
                        return {
                              url: `projects/completed?sort=${sort}&search=${search}`
                        }
                  },
                  transformResponse: responseData => {
                        return responseData
                  },
                  providesTags: ['Completed']
            }),
      })
})

export const { useGetCompletedProjectsQuery } = extendedApiCompleted;