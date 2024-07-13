import { configureStore } from "@reduxjs/toolkit"
import cartReducer from '../features/api/cartSlice'
import couponsReducer from '../features/api/couponsSlice'
import drugsReducer from '../features/api/drugsSlice'
import drugsShopsReducer from '../features/api/drugsShopsSlice'
import ordersReducer from '../features/api/ordersSlice'
import shopsReducer from '../features/api/shopsSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        coupons: couponsReducer,
        drugs: drugsReducer,
        drugsShops: drugsShopsReducer,
        orders: ordersReducer,
        shops: shopsReducer

    }
})