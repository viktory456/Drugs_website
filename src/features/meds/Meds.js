import { addFavorite, selectMedById, selectAllMeds} from '../api/medsSlice'
import {selectAllCart} from "../api/cartSlice"
import {Buffer} from "buffer" 
import { useState, useEffect, useMemo } from 'react'
import { useGetShopsQuery, selectAllShops, selectShopById } from '../api/shopsSlice'
import { StarEmpty, StarSolid } from './Favorites'
import { useSelector, useDispatch } from 'react-redux'
import {addToCart} from '../api/cartSlice'
import styled from "styled-components"
import {Stack, Grid, Typography, Box, Button} from '@mui/material'
import { useTheme } from '@mui/material/styles'

const QtyButtons = styled(Button) (function () {
    return {
        fontSize:'16px',
        minWidth:`20px`, 
        '&:hover': {
            fontWeight: 'bold',
            backgroundColor: 'transparent',
        }
    }
  })

const Med = ({medId}) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const meds = useSelector(selectAllMeds)
    const med = useSelector((state) => selectMedById(state, Number(medId.id)))
    const cart = useSelector(selectAllCart)
    let startingQty = 1;
    for(let i =0; i < cart.length; i++){
        if(cart[i].shop == med.shop_id && cart[i].name == med.name){
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
    const shop = useSelector((state) => selectShopById(state, Number(med?.shop_id)))
    const [favorite, setFavorite] = useState(med?.favorite)
    const base64 = Buffer.from(med?.img.data, "binary" ).toString("base64");
    const idInCart = `${med?.id}${new Date().getTime()}`

    const onAddItemClicked = async () => {
        try {
             await dispatch(addToCart({ id: idInCart, name: med?.name, shop: med?.shop_id, quantity: quantity, price: med?.price })).unwrap()
        } catch (err) {
            console.error('Failed to add the item', err)
        }
    }
    const toggleFav = () => {dispatch(addFavorite(Number(medId.id))).unwrap()}

  return (
    <Grid item xs={7} md={7} lg={7} xl={4.4} sx={{position:'relative', padding:{xs:'8px', md:'16px'}, boxShadow:`1px 1px 2px ${theme.palette.secondary.main}`, borderRadius: `5px`, margin: `5px`, backgroundColor:`${theme.palette.background.paperLight}`}}>
        <Stack direction="column" spacing={1}>
            <Box sx={{position:'absolute', right:{xs:'5px', md:'16px'}, top:{xs:'5px', md:'16px'}}} onClick={toggleFav}>
                {favorite ? <StarSolid /> : <StarEmpty />}
            </Box>
        <Grid container spacing={0} justifyContent="center" alignItems='center'> <Box component="img" sx={{height: 150, width: 130}} src={`data:image/png;base64,${base64}`}/></Grid>
        <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
            <Box sx={{width:`120px`, fontWeight:`bold`, display:'flex', justifyContent:'center'}}>{med.name}</Box>
            <Box sx={{alignItems:"center", display:{xs:'none', sm:'block'}}}>{`${med.price}`}</Box>
            <Box display={{xs:'none', sm:'none', md:'none', lg:'flex'}} alignItems='center' justifyContent='center' width={150} sx={{fontWeight: `bold`}}>{shop?.title}</Box>
            <Stack direction='row' justifyContent='center' alignItems='center' sx={{display:{xs:'none', sm:'flex'}}}>
                <QtyButtons sx={{color:`${theme.palette.secondary.main}`}} onClick={qtyDecrease}>{'-'}</QtyButtons>
                <Typography sx={{fontStyle:`bold`}}>{quantity}</Typography>
                <QtyButtons sx={{color:`${theme.palette.secondary.main}`}} onClick={qtyIncrease}>{'+'}</QtyButtons>
            </Stack>
            <Button variant='contained' sx={{minWidth:{xs:'20px', md:'60px'}, height:{xs:'20px', md:'40px'}, borderRadius:{xs:'3px', md:'5px'}, padding:{xs:'3px', md:'6px 8px'}, fontSize:{xs:'10px', md:'16px'}}} type="button" onClick={onAddItemClicked}>{'Buy'}</Button>
        </Stack>
        </Stack>
    </Grid>
  )
}

export default Med