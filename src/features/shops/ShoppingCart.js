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
  }

  let total = 0; 
  if (isLoading) {
    total = <p>"Calculating..."</p>;
  } else if (isSuccess) {
    for(let i=0; i<cart.ids.length; i++){
      total = total + cart.entities[cart.ids[i]].price * cart.entities[cart.ids[i]].quantity
    }
  }



  return (
    <div className='shoppingCart'>
      <div className='cartTitle'>
          <div>Name</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Shop</div>
          <div>Total</div>
      </div>
      <div>{contentCart}</div>
      <div className='cartTitle'><div>{'Total:'}</div><div>{total}</div></div>
    </div>

  )
}

export default ShoppingCart