import { useGetShopsQuery, selectShopById} from '../api/shopsSlice'
import { createContext, useContext, useEffect } from "react"
import { ShopChosen } from '../mainPage/MainPage'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import styled from "styled-components"
import { useTheme } from '@mui/material/styles'

const ShopButton = styled(Button) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("mobile")]: {
      fontSize:'10px'
    },
    [theme.breakpoints.up("tablet")]: {
      fontSize:'14px'
    },
    [theme.breakpoints.up("laptop")]: {
      fontSize:'16px'
    }
  }
})


const Shop = ({shopId, setShop}) => {
  
// const useShop = useContext(ShopChosen)
const shop = useSelector((state) => selectShopById(state, Number(shopId.id)))
const onShopChanged = () => {setShop(shopId.id)}

  return (
    <ShopButton variant="outlined" onClick={onShopChanged}> {shop.title} </ShopButton>
  )
}

export default Shop