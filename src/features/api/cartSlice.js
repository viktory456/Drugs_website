import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from './api'

const cartAdapter = createEntityAdapter()

const initialState = cartAdapter.getInitialState()

export const cartApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getCart: builder.query({
            query: () => '/cart',
            transformResponse: responseData => {

                return cartAdapter.setAll(initialState, responseData.cart)

            },
            providesTags: { type: 'Cart', id: "LIST" },
            // providesTags: (result, error, arg) => [
            //     {type: 'Cart', id: "LIST"},
            //     ...result.ids.map(({ id }) => ({ type: 'Cart', id }))
            // ]
        }),
        addToCart: builder.mutation({
            query: itemToAdd => ({
                url: '/cart',
                method: 'POST',
                body: itemToAdd
            }),
            invalidatesTags: [
                { type: 'Cart', id: "LIST" }
            ]
        }),
    })
})
export const {
    useGetCartQuery,
    useAddToCartMutation,
    // useDeleteSkillMutation
} = cartApiSlice

// export const selectShopsResult = shopsApiSlice.endpoints.getShops.select()