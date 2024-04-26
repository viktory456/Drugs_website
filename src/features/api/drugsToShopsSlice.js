import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from './api'
import { useParams } from 'react-router-dom'

const drugsToShopsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.id.localeCompare(a.id)
})

const initialState = drugsToShopsAdapter.getInitialState()

export const drugsToShopsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getDrugs: builder.query({
            query: () => '/shops', //to use SelectId???
            transformResponse: responseData => {
                // let drugsToShop = responseData.filter(drug => drug.shopId === id);
                // console.log(drugsToShop);
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
    useGetDrugsQuery,
} = drugsToShopsApiSlice

// export const selectShopsResult = shopsApiSlice.endpoints.getShops.select()