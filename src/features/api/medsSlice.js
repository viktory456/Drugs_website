import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import axios from "axios"

const HOME_URL = 'http://localhost:3000'
const FAV_URL = 'http://localhost:3000/favorite'
const medsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const priceSortedAdapter = createEntityAdapter({sortComparer: (a, b) => b.price.localeCompare(a.price)})
const initialState = medsAdapter.getInitialState()

export const fetchMeds = createAsyncThunk('meds/fetchMeds', async () => {
    const response = await axios.get(HOME_URL)
    return response.data.meds
})
export const fetchMedsByPrice = createAsyncThunk('meds/fetchMedsByPrice', async () => {
    const response = await axios.get(HOME_URL)
    return response.data.meds
})
export const addFavorite = createAsyncThunk('meds/addFavorite', async (id , newFav) => {
    try {
        const response = await axios.put(FAV_URL, {id, newFav})
        return response.data
    } catch (err){
        return err.message
    }
})
const medsSlice = createSlice({
    name: 'meds',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMeds.fulfilled, (state, action) => {
                medsAdapter.upsertMany(state, action.payload)
            })
            .addCase(fetchMedsByPrice.fulfilled, (state, action) => {
                priceSortedAdapter.addOne(state, action.payload)
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                // const { id } = action.payload;
                // const { newFav } = action.payload;
                medsAdapter.upsertOne(state, action.payload)
            })
    }
})

export const {
    selectAll: selectAllMeds,
    selectById: selectMedById,
    selectIds: selectMedIds
} = medsAdapter.getSelectors(state => state.meds)

export default medsSlice.reducer