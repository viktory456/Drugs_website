import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from './api'
import { useParams } from 'react-router-dom'

const drugsToShopsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id.localeCompare(a.id)
})

const initialState = drugsToShopsAdapter.getInitialState()

export const drugsToShopsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getDrugsToShops: builder.query({
            query: (id) => ({ url: `/shops/${id}` }), //to use SelectId???
            transformResponse: responseData => {
                console.log(responseData);
                return drugsToShopsAdapter.setAll(initialState, responseData)
            },
            providesTags: { type: 'DrugsToShops', id: "LIST" },
            // providesTags: (result, error, arg) => [
            //     ...result.ids.map(id => ({ type: 'DrugsToShops', id }))
            // ]
        }),
    })
})
export const {
    useGetDrugsToShopsQuery,
} = drugsToShopsApiSlice

// export const selectShopsResult = shopsApiSlice.endpoints.getShops.select()