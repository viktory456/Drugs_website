import React from 'react'
import { useParams } from 'react-router-dom'
import { selectShopById } from '../api/shopsSlice'
import MedsShops from '../meds/MedsShops'
import { useSelector } from 'react-redux'
import {Stack, Box} from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const ShopPage = () => {
  const theme = useTheme()
  const { shopId } = useParams()
  const shop = useSelector((state) => selectShopById(state, Number(shopId)))

  return (
    
    <Stack direction='column' spacing={2} sx={{color:`${theme.palette.text.primary}`}}>
        <Box sx={{fontWeight:'bold', color:`${theme.palette.text.secondary}`}}>{shop.title}</Box>
        <Box sx={{color:`${theme.palette.text.secondary}`}}>{shop.adress}</Box>
        <MedsShops shopId={shopId}/>
    </Stack>

  )
}
