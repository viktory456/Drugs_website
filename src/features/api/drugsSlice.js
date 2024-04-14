import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from '../api/api'

const drugsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id.localeCompare(a.id)
})

const initialState = drugsAdapter.getInitialState()

export const drugsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getDrugs: builder.query({
            query: () => '/',
            transformResponse: responseData => {
                return drugsAdapter.setAll(initialState, responseData.drugs)
            },
            providesTags: { type: 'Drug', id: "LIST" },
            // providesTags: (result, error, arg) => [
            //     {type: 'Shops', id: "LIST"},
            //     ...result.ids.map(({ id }) => ({ type: 'Skills', id }))
            // ]
        }),
    })
})
export const {
    useGetDrugsQuery,
    // useAddNewSkillMutation,
    // useDeleteSkillMutation
} = drugsApiSlice

// export const selectShopsResult = shopsApiSlice.endpoints.getShops.select()

