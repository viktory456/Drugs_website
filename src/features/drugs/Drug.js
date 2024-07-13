import { addFavorite, selectDrugById, selectAllDrugs} from '../api/drugsSlice'
import {selectAllCart} from "../api/cartSlice"
import {Buffer} from "buffer" 
import { useState, useEffect, useMemo } from 'react'
import { useGetShopsQuery, selectAllShops, selectShopById } from '../api/shopsSlice'
import { StarEmpty, StarSolid } from './Favorites'
import { useSelector, useDispatch } from 'react-redux'
import {addToCart} from '../api/cartSlice'


const Drug = ({drugId}) => {

    const dispatch = useDispatch()
    const drugs = useSelector(selectAllDrugs)
    const drug = useSelector((state) => selectDrugById(state, Number(drugId.id)))
    const cart = useSelector(selectAllCart)
    let startingQty = 1;
    for(let i =0; i < cart.length; i++){
        if(cart[i].shop == drug.shop_id && cart[i].name == drug.name){
            startingQty = Number(cart[i].quantity)
        }
    }
    const [quantity, setQuantity] = useState(startingQty)
    const qtyDecrease = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1)
    }
    const qtyIncrease = () => setQuantity(quantity + 1)

    const shops = useSelector(selectAllShops)
    const shop = useSelector((state) => selectShopById(state, Number(drug?.shop_id)))
    const [favorite, setFavorite] = useState(drug?.favorite)
    const base64 = Buffer.from(drug?.img.data, "binary" ).toString("base64");
    const idInCart = `${drug?.id}${new Date().getTime()}`

    const onAddItemClicked = async () => {
        try {
             await dispatch(addToCart({ id: idInCart, name: drug?.name, shop: drug?.shop_id, quantity: quantity, price: drug?.price })).unwrap()
        } catch (err) {
            console.error('Failed to add the item', err)
        }
    }
    const toggleFav = () => {
            dispatch(addFavorite(Number(drugId.id))).unwrap()
    }

  return (
    <article className='drugItem'>
        <div className='favIcon' onClick={toggleFav}>
            {favorite ? <StarSolid /> : <StarEmpty />}
        </div>
        <img className='drugPic' src={`data:image/png;base64,${base64}`}/>
        <div className='picDescription'>
            <h2>{drug.name}</h2>
            <p>{`${drug.price} uah`}</p>
            <h2>{shop?.title}</h2>
            <div className='qtyCounter'>
                <button className='qtyButton' onClick={qtyDecrease}>{'-'}</button>
                <div>{quantity}</div>
                <button className='qtyButton' onClick={qtyIncrease}>{'+'}</button>
            </div>
            <button className='buyButton' type="button" onClick={onAddItemClicked}>{'add to Cart'}</button>
        </div>
    </article>
  )
}

export default Drug