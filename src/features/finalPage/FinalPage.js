import { InputForm } from './InputForm'
import { ShoppingCart } from './ShoppingCart'
import React, { createContext, useContext, useState } from "react"
import { useDispatch } from "react-redux"
import {Stack} from '@mui/material'
import styled from "styled-components"
import { useTheme } from '@mui/material/styles'


const Container = styled(Stack) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("mobile")]: {
      gap: 5,
      width:'100%',
      justifyContent:'center'
    },
    [theme.breakpoints.up("desktop")]: {
      // direction:'row'
    }
  }
})
const InputFromStyled = styled(InputForm) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("laptop")]: {
      height: '100%',
    },
    [theme.breakpoints.up("desktop")]: {
      height:'70%'
    }
  }
})

const MapAndInput = styled(Stack) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("mobile")]: {
      gap: 5,
      direction:'column',
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.up("laptop")]: {
      direction:'row'
    },
    [theme.breakpoints.up("desktop")]: {
      direction:'column',
      width: '40%',
      height: '30%',
    }
  }
})

const NameContext = createContext();
const EmailContext = createContext();
const PhoneContext = createContext();
const AdressContext = createContext();
const CartTotalContext = createContext();
const CurrierContext = createContext();

export const FinalPage = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [phone, setPhone] = useState('phone');
  const [adress, setAdress] = useState('adress'); 
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState('');
  const [currier, setCurrier] = useState(false);

  return (
    <NameContext.Provider value={name}>
      <EmailContext.Provider value={email}>
        <PhoneContext.Provider value={phone}>
          <AdressContext.Provider value={adress}>
          <CartTotalContext.Provider value={cartTotal}>
            <CurrierContext.Provider value={currier}>
              <Container>
                <MapAndInput>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162758.58827211132!2d30.36788683338299!3d50.40191909148036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2sKyiv%2C%20Ukraine%2C%2002000!5e0!3m2!1sen!2spl!4v1719164406785!5m2!1sen!2spl" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  <InputFromStyled setName={setName} setAdress={setAdress} setEmail={setEmail} setPhone={setPhone} setCurrier={setCurrier}/>
                </MapAndInput>
                <ShoppingCart setCartTotal={setCartTotal} setCart={setCart} name={name} email={email} phone={phone} adress={adress} deliveryType={currier} totalCost={cartTotal} order={cart}/> 
              </Container>
           </CurrierContext.Provider>
           </CartTotalContext.Provider>
          </AdressContext.Provider>
        </PhoneContext.Provider>
      </EmailContext.Provider>
    </NameContext.Provider>
    

  )
}

