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
    },
    [theme.breakpoints.up("mobile")]: {
      borderRadius:'2px',
      width: '100%'
    },
    [theme.breakpoints.up("tablet")]: {
      borderRadius:'5px',
      width: '40%'
    },
    [theme.breakpoints.up("laptop")]: {
       width: '30%'
    },
    [theme.breakpoints.up("desktop")]: {
       width: '18%'
    },
  }
})
const NameStyled = styled(Box) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("mobile")]: {
      fontSize:'16px',
      fontWeight:'700',
      color:theme.palette.text.main,
      marginBottom:theme.spacing(2)
    },
    [theme.breakpoints.up("tablet")]: {
      fontSize:'20px'
    },
    [theme.breakpoints.up("desktop")]: {
      fontSize:'24px',
      marginBottom:theme.spacing(3)
    },
  }
})
const CodeStyled = styled(Box) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("mobile")]: {
      fontSize:'12px',
      color:theme.palette.text.primary,
      marginBottom:theme.spacing(2)
    },
    [theme.breakpoints.up("tablet")]: {
      fontSize:'14px',
      marginBottom:theme.spacing(3)
    },
  }
})


export const Coupon = (couponId) => {

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
    <GridItemStyled item margin='5px' padding='10px'>
        <Stack direction='column' justifyContent='center' alignItems='center'>
          <NameStyled>{couponSelected.name}</NameStyled>
          <CodeStyled>{couponCode.toUpperCase()}</CodeStyled>
          <Button variant='contained' onClick={copyCouponFunc}>{buttonText ? 'Remove' : 'Copy'}</Button>
        </Stack>
    </GridItemStyled>
  )
}
