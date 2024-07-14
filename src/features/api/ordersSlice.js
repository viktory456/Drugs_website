import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import axios from "axios"


const ORDERS_URL = 'http://localhost:3000/orders'
const ordersAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const initialState = ordersAdapter.getInitialState()

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const response = await axios.get(ORDERS_URL)
    return response.data
})
export const addOrder = createAsyncThunk('orders/addOrder', async (itemToAdd) => {
    const response = await axios.post(ORDERS_URL, itemToAdd)
    return response.data
})

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                ordersAdapter.upsertMany(state, action.payload)
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                ordersAdapter.addOne(state, action.payload)
            })
    }
})


export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds
} = ordersAdapter.getSelectors(state => state.orders)

export default ordersSlice.reducer
