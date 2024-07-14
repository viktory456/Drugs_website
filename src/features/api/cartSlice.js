import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from "axios"

const CART_URL = 'http://localhost:3000/cart'
const cartAdapter = createEntityAdapter({sortComparer: (a, b) => a.id.localeCompare(b.id)})
const initialState = cartAdapter.getInitialState()

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await axios.get(CART_URL)
    return response.data.cart
})
export const addToCart = createAsyncThunk('cart/addToCart', async (itemToAdd) => {
    try {
        const response = await axios.post(CART_URL, itemToAdd)
        return response.data
    } catch (err){
        return err.message
    }
})
export const increaseQty = createAsyncThunk('cart/increaseQty', async (initialItem) => {
    const {quantity} = initialItem.cartItem
    const newObject = {...initialItem.cartItem, quantity: Number(quantity)+1}
    try {
        const response = await axios.put(CART_URL, newObject)
        return response.data
    } catch (err){
        return err.message
    }
})
export const decreaseQty = createAsyncThunk('cart/decreaseQty', async (initialItem) => {
    const {quantity} = initialItem.cartItem
    const newObject = {...initialItem.cartItem, quantity: Number(quantity)-1}
    try {
        const response = await axios.put(CART_URL, newObject)
        return response.data
    } catch (err){
        return err.message
    }
})
export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (cartItem) => {
    const id = Number(cartItem.id)
    try {
        const response = await axios.delete(CART_URL, {data: {id}})
        if (response?.status === 200) return cartItem;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err){
        return err.message
    }
})
export const addCustomer = createAsyncThunk('cart/addCustomer', async (customerData) => {
    try {
        const response = await axios.post('http://localhost:3000/customer', customerData)
        return response.data
    } catch (err){
        return err.message
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                cartAdapter.upsertMany(state, action.payload)
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                cartAdapter.addOne(state, action.payload)
            })
            .addCase(increaseQty.fulfilled, (state, action) => {
                cartAdapter.upsertOne(state, action.payload)
            })
            .addCase(decreaseQty.fulfilled, (state, action) => {
                cartAdapter.upsertOne(state, action.payload)
            })
            .addCase(decreaseQty.rejected, (state, action) => {
                console.log(action.error.message);
            })
            .addCase(decreaseQty.pending, (state, action) => {
                console.log(action.payload);
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                console.log(action.payload);
                const { id } = action.payload;
                cartAdapter.removeOne(state, id)
            })
            .addCase(deleteFromCart.rejected, (state, action) => {
                console.log(action.error.message);
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                cartAdapter.addOne(state, action.payload)
            })
    }
})

export const {
    selectAll: selectAllCart,
    selectById: selectCartById,
    selectIds: selectCartIds
} = cartAdapter.getSelectors(state => state.cart)

// export const selectAllCart = (state) => state.cart

export default cartSlice.reducer