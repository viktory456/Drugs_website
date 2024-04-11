import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const shopsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id.localeCompare(a.id)
})

const initialState = shopsAdapter.getInitialState()

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api'}),
    tagTypes: ['Shops'],
    endpoints: builder => ({
        getShops: builder.query({
            query: () => '/',
            transformResponse: responseData => {
                // const loadedShops = responseData.map(shop => {
                //     // console.log(shop.name);
                //     return shop;
                // });
                return shopsAdapter.setAll(initialState, responseData)
            },
            // providesTags: { type: 'Post', id: "LIST" },
            // providesTags: (result, error, arg) => [
            //     {type: 'Shops', id: "LIST"},
            //     ...result.ids.map(({ id }) => ({ type: 'Skills', id }))
            // ]
        }),
        // addNewSkill: builder.mutation({
        //     query: (newSkill) => ({
        //         url: '/skills',
        //         method: 'POST',
        //         body: newSkill
        //     }),
        //     // invalidatesTags: [
        //     //     { type: 'Skills'}
        //     // ]
        //     invalidatesTags: ['Skills'],
        // }),
        // deleteSkill: builder.mutation({
        //    query: ({id}) => ({
        //         url: '/skills',
        //         method: 'DELETE',
        //         body: {id}
        //     }),
        //     // invalidatesTags: (result, error, arg) => [
        //     //     { type: 'Skills', id: arg.id }
        //     // ]
        //     invalidatesTags: ['Skills'],
        // })
    })
})
export const {
    useGetShopsQuery,
    // useAddNewSkillMutation,
    // useDeleteSkillMutation
} = api

export const selectShopsResult = api.endpoints.getShops.select()

