import { configureStore } from "@reduxjs/toolkit"
import cartReducer from '../features/api/cartSlice'
import couponsReducer from '../features/api/couponsSlice'
import medsReducer from '../features/api/medsSlice'
import medsShopsReducer from '../features/api/medsShopsSlice'
import ordersReducer from '../features/api/ordersSlice'
import shopsReducer from '../features/api/shopsSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        coupons: couponsReducer,
        meds: medsReducer,
        medsShops: medsShopsReducer,
        orders: ordersReducer,
        shops: shopsReducer

    }
})