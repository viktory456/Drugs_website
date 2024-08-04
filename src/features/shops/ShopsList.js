import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import Shop from './Shop'
import {Box, Typography, Stack} from '@mui/material'
import { useTheme } from '@mui/material/styles'


const ShopsList = ({setShop}) => {
  const theme = useTheme();
  const shops = useSelector(selectAllShops)
  let contentShops = shops.map(shopId => <Shop setShop={setShop} key={shopId.id} shopId={shopId}/>)
       
  return(
    <Box sx={{padding: `15px`, minWidth: `200px`, position: `fixed`}}>
      <Typography variant='h5' sx={{color:`${theme.palette.text.secondary}`, textAlign:"center", margin:{xs:'8px', md:'15px'}, fontSize:{xs:'14px', md:'16px'}}}>CHOOSE SHOP:</Typography>
      <Stack direction={{xs:'row', md:'column'}} spacing={{ xs:1, md:4 }} useFlexGap flexWrap='wrap'>{contentShops}</Stack>
    </Box>
  );
}

export default ShopsList






