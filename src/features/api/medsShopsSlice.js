import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from "axios"

const HOME_URL = 'http://localhost:3000'
const medsShopsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const initialState = medsShopsAdapter.getInitialState()

export const fetchMedsShops = createAsyncThunk('medsShops/fetchMedsShops', async () => {
    const response = await axios.get(HOME_URL)
    return response.data.medsShops
})

const medsShopsSlice = createSlice({
    name: 'medsShops',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMedsShops.fulfilled, (state, action) => {
                medsShopsAdapter.upsertMany(state, action.payload)
            })
    }
})


export const {
    selectAll: selectAllDtS,
    selectById: selectDtSById,
    selectIds: selectDtSIds
} = medsShopsAdapter.getSelectors(state =>state.medsShops)

export default medsShopsSlice.reducer