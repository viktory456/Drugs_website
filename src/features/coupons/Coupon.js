import React, { useState } from 'react'
import { copyCoupon, selectCouponById } from '../api/couponsSlice'
import { useSelector, useDispatch } from "react-redux"
import { Grid, Box, Stack, Button } from '@mui/material'
import styled from "styled-components"
import { useTheme } from '@mui/material/styles'

const GridItemStyled = styled(Grid) (function () {
  const theme = useTheme();
  return {
    boxShadow: theme.shadows[1],
    backgroundColor:theme.palette.background.paperLight,
      '&:hover': {
      boxShadow: theme.shadows[2],
      cursor: 'pointer'
    }
  }
})


export const Coupon = (couponId) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const couponSelected = useSelector((state) => selectCouponById(state, Number(couponId.couponId)))
    const [buttonText, setButtonText] = useState(couponSelected.copied)
    const [couponCode, setCouponCode] = useState(couponSelected.code)

    const copyCouponFunc = () => {
        setButtonText(!buttonText)
        if (couponSelected.copied === true) {
            dispatch(copyCoupon(couponSelected)).unwrap()
        } else {
            dispatch(copyCoupon(couponSelected)).unwrap()
        }
    }
    useState(() =>{
        if(window.innerWidth < 280){
          setCouponCode('')
        } else {
          setCouponCode(couponSelected.code)
        }
      },[window.innerWidth]);

  return (
    <GridItemStyled item xs={12} sm={5} md={4} lg={3} sx={{borderRadius:{xs:'2px',md:'5px'}, padding:{xs:'5px',md:'10px'}, margin:{xs:'5px',md:'10px'}}}>
        <Stack direction='column' spacing={{xs:1,md:2}} justifyContent='center' alignItems='center'>
        <Box sx={{fontSize:{xs:'16px',sm:'20px', md:'24px'}, color:`${theme.palette.text.main}`, fontWeight:'700'}}>{couponSelected.name}</Box>
        <Box sx={{fontSize:{xs:'12px',sm:'14px', md:'16px'}, color:`${theme.palette.text.primary}`}}>{couponCode.toUpperCase()}</Box>
        <Button variant='contained' onClick={copyCouponFunc}>{buttonText ? 'Remove' : 'Copy'}</Button>
        </Stack>
    </GridItemStyled>
  )
}
