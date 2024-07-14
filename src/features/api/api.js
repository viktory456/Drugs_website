import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Shop', 'Med', 'Cart', 'MedsShops', 'Orders', 'Customer'],
    endpoints: builder => ({})
})