import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from '../api/api'
import { useParams } from 'react-router-dom'

const shopsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id.localeCompare(a.id)
})

const initialState = shopsAdapter.getInitialState()

export const shopsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getShops: builder.query({
            query: () => '/',
            transformResponse: responseData => {
                return shopsAdapter.setAll(initialState, responseData.shops)
            },
            providesTags: { type: 'Shop', id: "LIST" },
            // providesTags: (result, error, arg) => [
            //     {type: 'Shops', id: "LIST"},
            //     ...result.ids.map(({ id }) => ({ type: 'Skills', id }))
            // ]
        }),
        // getShopsDetailed: builder.query({
        //     query: () => '/shops',
        //     transformResponse: responseData => {
        //         return shopsAdapter.setAll(initialState, responseData)
        //     },
        //     providesTags: { type: 'Shop', id: "LIST" },
        //     // providesTags: (result, error, arg) => [
        //     //     {type: 'Shops', id: "LIST"},
        //     //     ...result.ids.map(({ id }) => ({ type: 'Skills', id }))
        //     // ]
        // }),
        }),
    })

export const {
    useGetShopsQuery,
    // useGetShopsDetailedQuery,
    // useDeleteSkillMutation
} = shopsApiSlice

// export const selectShopsResult = shopsApiSlice.endpoints.getShops.select()

