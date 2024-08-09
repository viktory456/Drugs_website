import React, {useState, useEffect} from 'react'
import { selectAllOrders } from '../api/ordersSlice'
import { useSelector } from "react-redux"
import { SingleOrder } from '../history/SingleOrder'
import styled from "styled-components"
import { Typography, Box, TextField, Stack, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const StackStyled = styled(Stack) (function () {
  const theme = useTheme();
  return {
    border:`1px solid ${theme.palette.secondary.main}`,
    borderRadius:'5px',
    overflowY: "auto",
    height:'600px',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px ${theme.palette.common.white}`,
      webkitBoxShadow: `inset 0 0 6px ${theme.palette.common.white}`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.common.white,
      outline: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: '3px',
    },
    [theme.breakpoints.up("mobile")]: {
      marginTop:'400px'
    },
    [theme.breakpoints.up("tablet")]: {
      marginTop:'350px'
    }
  }
})
const GridContainer = styled(Grid) (function () {
  const theme = useTheme();
  return {
    position:'fixed',
    top:'100px',
    justifyContent:'center', 
    [theme.breakpoints.up("mobile")]: {
      display: 'flex',
      width:'80vw'
    },
    [theme.breakpoints.up("tablet")]: {
      display: 'grid',
       width:'100vw'
    }
  }
})
const Description = styled(Typography) (function () {
  const theme = useTheme();
  return {
   color:`${theme.palette.text.secondary}`,
   padding:'20px',
   textAlign:'center'
  }
})
const InputForm = styled(Stack) (function () {
  const theme = useTheme();
  return {
    margin: 'auto',
    [theme.breakpoints.up("mobile")]: {
      width:'200px'
    },
    [theme.breakpoints.up("tablet")]: {
      width:'400px'
    }
  }
})

export const History = () => {

  const orders = useSelector(selectAllOrders)
  let ordersList = orders.map(orderId => <SingleOrder orderId={orderId} key={orderId.id}/>)
  const customers = useSelector(selectAllOrders)
  let chosenCustomer = null;
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  const onEmailChanged = e => {setEmail(e.target.value)}
  const onPhoneChanged = e => {setPhone(e.target.value)}
  for (const customer of customers) {
    if (customer.customerEmail == email || customer.customerPhone == phone) {
      chosenCustomer = customer.id
      break
    }
  }
  return (
    <Box>
      <GridContainer container>
      <Grid item padding='25px' display='flex' justifyContent='center'><Description>Type your email / phone number to pick your order </Description></Grid>
      <Grid item>
        <InputForm>
          <TextField id="email" label="Email" variant="standard" value={email} onChange={onEmailChanged}/>
          <TextField id="phone" label="Phone" variant="standard" value={phone} onChange={onPhoneChanged}/>
        </InputForm>
      </Grid>
      </GridContainer>
      <StackStyled>{ordersList[chosenCustomer] || ordersList}</StackStyled>
    </Box>

  )

}
