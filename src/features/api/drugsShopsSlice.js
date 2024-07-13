import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from "axios"
// import {apiSlice} from './api'
// import { useParams } from 'react-router-dom'

const HOME_URL = 'http://localhost:3000'
const drugsShopsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const initialState = drugsShopsAdapter.getInitialState()

export const fetchDrugsShops = createAsyncThunk('drugsShops/fetchDrugsShops', async () => {
    const response = await axios.get(HOME_URL)
    return response.data.drugsShops
})

const drugsShopsSlice = createSlice({
    name: 'drugsShops',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDrugsShops.fulfilled, (state, action) => {
                drugsShopsAdapter.upsertMany(state, action.payload)
            })
    }
})


export const {
    selectAll: selectAllDtS,
    selectById: selectDtSById,
    selectIds: selectDtSIds
} = drugsShopsAdapter.getSelectors(state =>state.drugsShops)

export default drugsShopsSlice.reducer