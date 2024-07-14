import {createSlice, createSelector, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const COUPONS_URL = 'http://localhost:3000/coupons'
const couponsAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const initialState = couponsAdapter.getInitialState()

export const fetchCoupons = createAsyncThunk('coupons/fetchCoupons', async () => {
    const response = await axios.get(COUPONS_URL)
    return response.data
})
export const copyCoupon = createAsyncThunk('cart/copyCoupon', async (couponSelected) => {
    try {
        const response = await axios.put(COUPONS_URL, couponSelected)
        return response.data
    } catch (err){
        return err.message
    }
})
const couponsSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                couponsAdapter.upsertMany(state, action.payload)
            })
            .addCase(copyCoupon.fulfilled, (state, action) => {
                console.log(action.payload);
                const { id } = action.payload;
                couponsAdapter.upsertOne(state, id)
            })
    }
})

export const {
    selectAll: selectAllCoupons,
    selectById: selectCouponById,
    selectIds: selectCouponIds
} = couponsAdapter.getSelectors(state => state.coupons)

export default couponsSlice.reducer

