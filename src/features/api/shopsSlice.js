import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from "axios"
// import {apiSlice} from '../api/api'
// import { useParams } from 'react-router-dom'

const HOME_URL = 'http://localhost:3000'
const shopsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const initialState = shopsAdapter.getInitialState()

export const fetchShops = createAsyncThunk('shops/fetchShops', async () => {
    const response = await axios.get(HOME_URL)
    return response.data.shops
})

const shopsSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchShops.fulfilled, (state, action) => {
                shopsAdapter.upsertMany(state, action.payload)
            })
    }
})


export const {
    selectAll: selectAllShops,
    selectById: selectShopById,
    selectIds: selectShopIds
} = shopsAdapter.getSelectors(state => state.shops)

export default shopsSlice.reducer