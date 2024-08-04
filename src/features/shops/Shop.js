import { useGetShopsQuery, selectShopById} from '../api/shopsSlice'
import { createContext, useContext, useEffect } from "react"
import { ShopChosen } from '../mainPage/MainPage'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'


const Shop = ({shopId, setShop}) => {
  
const useShop = useContext(ShopChosen)
const shop = useSelector((state) => selectShopById(state, Number(shopId.id)))
const onShopChanged = () => {setShop(shopId.id)}

  return (
    <Button variant="outlined" onClick={onShopChanged} sx={{fontSize:{xs:'10px', sm:'14px', md:'16px'}}}>
    {shop.title}
  </Button>
  )
}

export default Shop