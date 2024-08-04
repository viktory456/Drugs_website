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
    overflowY: "auto",
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
  }
})

export const History = () => {
  const theme = useTheme();
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
      <Grid container sx={{position:'fixed', top:'100px', display:{xs:'flex', sm:'grid'}, justifyContent:'center', width:{xs:'80vw', sm:'100vw'}}}>
      <Grid item padding='20px' display='flex' justifyContent='center'><Typography sx={{color:`${theme.palette.text.secondary}`, padding:'20px', textAlign:'center'}}>Type your email / phone number to pick your order </Typography></Grid>
      <Grid item>
        <Stack sx={{width:{xs:'200px', sm:'400px'}, margin: 'auto'}}>
          <TextField id="email" label="Email" variant="standard" value={email} onChange={onEmailChanged}/>
          <TextField id="phone" label="Phone" variant="standard" value={phone} onChange={onPhoneChanged}/>
        </Stack>
      </Grid>
      </Grid>
      <StackStyled sx={{border:`1px solid ${theme.palette.secondary.main}`, borderRadius:'5px', marginTop:{xs:'400px', sm:'350px'}, height:'600px'}}>{ordersList[chosenCustomer] || ordersList}</StackStyled>
    </Box>

  )

}
