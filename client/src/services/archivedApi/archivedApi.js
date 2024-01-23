import { api } from '../api/api';

export const extendedApiArchived = api.injectEndpoints({
      endpoints: (builder) => ({
            getArchivedProjects: builder.query({
                  query: (args) => {
                        const { search, sort } = args;
                        return {
                              url: `projects/archived?sort=${sort}&search=${search}`
                        }
                  },
                  transformResponse: responseData => {
                        return responseData
                  },
                  providesTags: ['Archived']
            }),
      })
})

export const { useGetArchivedProjectsQuery } = extendedApiArchived;