import React, {useEffect, useState} from 'react'
import {selectAllCart, addCustomer} from "../api/cartSlice"
import {addOrder} from "../api/ordersSlice"
import { selectAllCoupons } from '../api/couponsSlice'
import { useSelector, useDispatch } from "react-redux"
import { Captcha } from '../coupons/Captcha'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Box, Button} from '@mui/material'
import styled from "styled-components"
import { useTheme } from '@mui/material/styles'

const CartStyled = styled(Stack) (function () {
  const theme = useTheme();
  return {
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: '5px',
    direction:'column',
    alignItems:'center',
    justifyContent:'space-between',
    [theme.breakpoints.up("mobile")]: {
      padding: '10px',
      width: '100%',

   },
   [theme.breakpoints.up("tablet")]: {
      padding: '30px'
   },
   [theme.breakpoints.up("desktop")]: {
      width: '55%',
      position: 'absolute',
      right: '16px',
      top:'80px'
 },
  }
})
const TableStyled = styled(Table) (function () {
  return {
    minWidth: `650px`,
  }
})
const TableCellStyled = styled(TableCell) (function () {
  const theme = useTheme();
  return {
    color: theme.palette.text.primary,
    textAlign: 'center',
  }
})
const GridItem = styled(Grid) (function () {
  const theme = useTheme();
  return {
    height:'100px',
    // width:'100px',
    marginTop:'15px',
    color:`${theme.palette.text.secondary}`,
    [theme.breakpoints.up("mobile")]: {
      padding: '10px',
      fontSize:'12px'
   },
   [theme.breakpoints.up("tablet")]: {
      padding: '30px',
      fontSize:'16px'
   },
  }
})

export const ShoppingCart = ({setCartTotal, setCart, name, email, phone, adress, deliveryType, totalCost, order}) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const [buttonStatus, setButtonStatus] = useState(true)
  const coupons = useSelector(selectAllCoupons)
  let couponsSelected = [{name:'Coupons applied: (uah)'}];
  let couponsSum = 0;
  for (let i = 0; i < coupons.length; i++) {
    if(coupons[i].copied === true){
      couponsSum+=coupons[i].name;
      couponsSelected.push(coupons[i])
    }
  }
  const couponsSelectedDiv = couponsSelected.map(coupon => {
    return <div key={coupon.name}>{coupon.name}</div>
  })
  const cart = useSelector(selectAllCart)
  function total(){
    let temp = cart.map(function(item){
      return item.price*item.quantity
    })
    let sum = temp.reduce(function(prev, next){
      return prev+next
    }, 0)
    return sum
  }
  let totalCart = total(); 
  let totalCartWithCoupons = totalCart - Number(couponsSum);
  localStorage.setItem('cart', JSON.stringify(cart));
  useEffect(() => {
    setCartTotal(totalCart.toFixed(2));
    const cartToSave = JSON.stringify(cart)
    setCart(cartToSave)
  }, [totalCart, cart])
  const onSubmitClicked = async () => {
      try {
        await dispatch(addOrder({ name, email, phone, adress, deliveryType, totalCost, order})).unwrap()
      } catch (err) {
          console.error('Failed to summbit the purchase', err)
      }
  }

  return (

    <CartStyled>

    <TableContainer component={Paper} elevation={0}>
      <TableStyled size="small" aria-label="cart table" >
        <TableHead>
          <TableRow>
            <TableCellStyled>Medicine</TableCellStyled>
            <TableCellStyled>Price</TableCellStyled>
            <TableCellStyled>Quantity</TableCellStyled>
            <TableCellStyled>Seller</TableCellStyled>
            <TableCellStyled>Total</TableCellStyled>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item) => (
            <TableRow key={item.price} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCellStyled component="th" scope="row">{item.name}</TableCellStyled>
              <TableCellStyled>{item.price}</TableCellStyled>
              <TableCellStyled>{item.quantity}</TableCellStyled>
              <TableCellStyled>{item.shop}</TableCellStyled>
              <TableCellStyled>{(item.price*item.quantity).toFixed(2)}</TableCellStyled>
            </TableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableContainer>

      <Grid container justifyContent="space-between" alignItems="flex-end" columns={12} rows={3}>
        <GridItem item width='50%'><Typography >{couponsSelected.length > 0 ? couponsSelectedDiv : 'Selected Coupons: none'}</Typography></GridItem>
        <GridItem item width='50%' marginTop='0px' padding='0px'><Typography align='right'>{'Total: '}{totalCartWithCoupons.toFixed(2)}</Typography></GridItem>
        <Grid item width='100%' height='150px' align='right'><Captcha setButtonStatus={setButtonStatus}/></Grid>
        <Grid item width='100%'><Button variant='contained' borderRadius='5px' type="button" onClick={onSubmitClicked} disabled={buttonStatus}>Confirm order</Button></Grid>
      </Grid>

    </CartStyled>

  )
}
