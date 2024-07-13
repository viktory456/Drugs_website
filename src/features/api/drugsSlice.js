import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import axios from "axios"
// import {apiSlice} from '../api/api'

const HOME_URL = 'http://localhost:3000'
const FAV_URL = 'http://localhost:3000/favorite'
const drugsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const priceSortedAdapter = createEntityAdapter({sortComparer: (a, b) => b.price.localeCompare(a.price)})
const initialState = drugsAdapter.getInitialState()

export const fetchDrugs = createAsyncThunk('drugs/fetchDrugs', async () => {
    const response = await axios.get(HOME_URL)
    return response.data.drugs
})
export const fetchDrugsByPrice = createAsyncThunk('drugs/fetchDrugsByPrice', async () => {
    const response = await axios.get(HOME_URL)
    return response.data.drugs
})
export const addFavorite = createAsyncThunk('drugs/addFavorite', async (id , newFav) => {
    try {
        const response = await axios.put(FAV_URL, {id, newFav})
        return response.data
    } catch (err){
        return err.message
    }
})
const drugsSlice = createSlice({
    name: 'drugs',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDrugs.fulfilled, (state, action) => {
                drugsAdapter.upsertMany(state, action.payload)
            })
            .addCase(fetchDrugsByPrice.fulfilled, (state, action) => {
                priceSortedAdapter.addOne(state, action.payload)
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                const { id } = action.payload;
                const { newFav } = action.payload;
                drugsAdapter.upsertOne(state, action.payload)
            })
    }
})

export const {
    selectAll: selectAllDrugs,
    selectById: selectDrugById,
    selectIds: selectDrugIds
} = drugsAdapter.getSelectors(state => state.drugs)

export default drugsSlice.reducer