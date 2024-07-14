import {selectAllCart, selectCartById, deleteFromCart, increaseQty, decreaseQty} from "../api/cartSlice"
import {Buffer} from "buffer" 
import { useState } from 'react'
import { useGetShopsQuery, selectShopById } from '../api/shopsSlice'
import { useSelector, useDispatch } from "react-redux"



const CartItem = ({cartItemId}) => {

  const dispatch = useDispatch()
  const cart = useSelector(selectAllCart)
    const cartItem = useSelector(state => selectCartById(state, Number(cartItemId.id)))
    const deleteItemClicked = async () => {
      console.log(cartItem.id);
      try {
          await dispatch(deleteFromCart({id:cartItem.id})).unwrap()
      } catch (err) {
          console.error('Failed to delete the item', err)
      }
    }
  const itemQtyChanged = async (e) => {
    try {
      if(e.target.innerText === '>') {
        await dispatch(increaseQty({cartItem})).unwrap()
      } else if(e.target.innerText === '<') {
        // console.log(cartItem);
        await dispatch(decreaseQty({cartItem})).unwrap()
      }
    } catch (err) {
        console.error('Failed to change qty', err)
    }
  }
  const shop = useSelector((state) => selectShopById(state, Number(cartItem?.shop)))
    // const { data:shops, isLoading, isSuccess, isError, error } = useGetShopsQuery('getShops')
    // let shop;
    // if (isLoading) {
    //     shop = <p>...</p>;
    //   } else if (isSuccess) {
    //     shop = shops.entities[cartItem.shop].name;
    //   }
    
    const itemTotal = (cartItem?.price * cartItem?.quantity).toFixed(2)

  return (
    <article className='cartItem'>
        <div>{cartItem?.name}</div>
        <div>{cartItem?.price}</div>
        <div className='qtyCart'><div className='qtyBtn' onClick={itemQtyChanged}>{'<'}</div><div>{cartItem?.quantity}</div><div className='qtyBtn' onClick={itemQtyChanged}>{'>'}</div></div>
        <div>{shop?.name}</div>
        <div>{itemTotal}</div>
        <div onClick={deleteItemClicked}><button className='rmvBtn'>Remove</button></div>
    </article>
  )
}

export default CartItem