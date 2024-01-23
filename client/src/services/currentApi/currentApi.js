import { api } from '../api/api';

export const extendedApiCurrent = api.injectEndpoints({
      endpoints: (builder) => ({
            getCurrentProjects: builder.query({
                  query: (args) => {
                        const { search, sort } = args;
                        return {
                              url: `projects/all?sort=${sort}&search=${search}`
                        }
                  },
                  transformResponse: responseData => {
                        return responseData
                  },
                  providesTags: ['Current']
            }),
            getSingleProject: builder.query({
                  query: (id) => `projects/${id}`,
                  transformResponse: responseData => {
                        return responseData
                  },
                  providesTags: ['Current']
            }),
            addProject: builder.mutation({
                  query: (body) => {
                        return {
                              url: 'projects',
                              method: 'POST',
                              body,
                              formData: true
                        }
                  },
                  invalidatesTags: ['Current']
            }),
            updateProject: builder.mutation({
                  query: ({id, formData}) => ({
                        url: `projects/${id}`,
                        method: 'PATCH',
                        body: formData,
                        formData: true,
                  }),
                  invalidatesTags: ['Current']
            })
      })
})

export const { useGetCurrentProjectsQuery, useGetSingleProjectQuery, useAddProjectMutation, useUpdateProjectMutation } = extendedApiCurrent;