import { useGetDrugsQuery} from '../api/drugsSlice'
import {useAddToCartMutation} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState } from 'react'
import { useGetShopsQuery } from '../api/shopsSlice'
import { useGetCartQuery } from '../api/cartSlice'



const CartItem = ({cartItemId}) => {

    const { itemInCart } = useGetCartQuery('getCart', {
        selectFromResult: ({ data }) => ({
            itemInCart: data?.entities[cartItemId]
        }),
    })
    const { data:shops, isLoading, isSuccess, isError, error } = useGetShopsQuery('getShops')
    let shop;
    if (isLoading) {
        shop = <p>...</p>;
      } else if (isSuccess) {
        shop = shops.entities[itemInCart.shop].name;
        // shop = shops.ids.filter(shopId => shopId === itemInCart.shop)
      }

    // const base64 = Buffer.from(drug.img.data, "binary" ).toString("base64");

    // const idInCart = `${drug.id}${new Date().getTime()}`
    // const [addToCart, { isLoading }] = useAddToCartMutation()

     
    
    const itemTotal = (itemInCart.price * itemInCart.quantity).toFixed(2)

  return (
    <article className='cartItem'>

        <div>{itemInCart.name}</div>
        <div>{itemInCart.price}</div>
        <div>{itemInCart.quantity}</div>
        <div>{shop}</div>
        <div>{itemTotal}</div>

    </article>
  )
}

export default CartItem