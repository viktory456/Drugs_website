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

const MedBlock = styled(Grid) (function () {
    const theme = useTheme();
    return {
        position:'relative',
        boxShadow:`1px 1px 2px ${theme.palette.secondary.main}`,
        borderRadius: `5px`,
        backgroundColor:`${theme.palette.background.paperLight}`,
      [theme.breakpoints.up("mobile")]: {
        padding:'8px',
        width:'100%',
        margin:'8px'
      },
      [theme.breakpoints.up("tablet")]: {
        padding:'14px',
        width:'60%',
        margin:'14px'
      },
      [theme.breakpoints.up("laptop")]: {
        padding:'14px',
        width:'55%',
        margin:'14px'
      },
      [theme.breakpoints.up("desktop")]: {
        padding:'16px',
        width:'40%',
        margin:'20px'
      }
    }
})
const ImageBox = styled(Box) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("mobile")]: {
      height:'90px',
      width:'auto',
    },
    [theme.breakpoints.up("laptop")]: {
      height:'120px',
      width:'auto',
    },
    [theme.breakpoints.up("desktop")]: {
      height:'150px',
      width:'auto',
    }
  }
})
const FavBlock = styled(Grid) (function () {
  const theme = useTheme();
  return {
    position:'absolute', 
    [theme.breakpoints.up("mobile")]: {
        right:'5px',
        top:'5px'
    },
    [theme.breakpoints.up("laptop")]: {
        right:'16px',
        top:'16px'
    }
  }
})
const QtyButtons = styled(Button) (function () {
    const theme = useTheme();
    return {
        color:`${theme.palette.secondary.main}`,
        fontSize:'16px',
        minWidth:`20px`, 
        '&:hover': {
            fontWeight: 'bold',
            backgroundColor: 'transparent',
        }
    }
})
const MedTitle = styled(Box) (function () {
  return {
    width:`120px`,
    fontWeight:`bold`,
    display:'flex',
    justifyContent:'center'
  }
})
const MedPrice = styled(Box) (function () {
    const theme = useTheme();
    return {
        alignItems:"center", 
      [theme.breakpoints.up("mobile")]: {
        display:'none', 
      },
      [theme.breakpoints.up("tablet")]: {
        display:'block'
      }
    }
})
const ShopTitle = styled(Box) (function () {
    const theme = useTheme();
    return {
        fontWeight: `bold`,
        width:"150px",
      [theme.breakpoints.up("mobile")]: {
        display:'none', 
      },
      [theme.breakpoints.up("desktop")]: {
        display:'flex'
      }
    }
})
const BuyButton = styled(Button) (function () {
    const theme = useTheme();
    return {
      [theme.breakpoints.up("mobile")]: {
        minWidth:'20px',
        height:'20px',
        borderRadius:'3px',
        fontSize:'10px',
        padding:'3px', 
      },
      [theme.breakpoints.up("laptop")]: {
        minWidth:'60px',
        height:'40px',
        borderRadius:'5px',
        fontSize:'16px',
        padding:'6px 8px', 
      }
    }
})
const QtyStack = styled(Stack) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("phone")]: {
      display:'none'
    },
    [theme.breakpoints.up("desktop")]: {
      display:'block'
    },
  }
})
const Med = ({medId}) => {
    // const theme = useTheme();
    const dispatch = useDispatch()
    // const meds = useSelector(selectAllMeds)
    const med = useSelector((state) => selectMedById(state, Number(medId.id)))
    const cart = useSelector(selectAllCart)
    let startingQty = 1;
    for(let i =0; i < cart.length; i++){
        if(cart[i].shop == med?.shop_id && cart[i].name == med.name){
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
    // const shops = useSelector(selectAllShops)
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
    <MedBlock item margin='15px'>
        <Stack direction="column">
            <FavBlock onClick={toggleFav}>{favorite ? <StarSolid /> : <StarEmpty />}</FavBlock>
            <Grid container spacing={0} justifyContent="center" alignItems='center'> <ImageBox component="img" src={`data:image/png;base64,${base64}`}/></Grid>
            <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                <MedTitle>{med.name}</MedTitle>
                <MedPrice>{med.price}</MedPrice>
                <ShopTitle alignItems='center' justifyContent='center' textAlign='center'>{shop?.title}</ShopTitle>
                <QtyStack direction='row' justifyContent='center' alignItems='center'>
                    <QtyButtons onClick={qtyDecrease}>{'-'}</QtyButtons>
                    <Typography sx={{fontStyle:`bold`}}>{quantity}</Typography>
                    <QtyButtons onClick={qtyIncrease}>{'+'}</QtyButtons>
                </QtyStack>
                <BuyButton variant='contained' type="button" onClick={onAddItemClicked}>{'Buy'}</BuyButton>
            </Stack>
        </Stack>
    </MedBlock>
  )
}

export default Med