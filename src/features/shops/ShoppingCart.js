import React from 'react'
import { useGetCartQuery } from '../api/cartSlice'
import CartItem from '../cart/CartItem'

const ShoppingCart = () => {

  const { data:cart, isLoading, isSuccess, isError, error } = useGetCartQuery('getCart')

  let contentCart;
  if (isLoading) {
    contentCart = <p>"Loading..."</p>;
  } else if (isSuccess) {
    contentCart = cart.ids.map(cartItemId=> <CartItem key={cartItemId} cartItemId={cartItemId}/>)
    console.log(cart.entites);
  } 


  return (
    <div>{contentCart}</div>
  )
}

export default ShoppingCart