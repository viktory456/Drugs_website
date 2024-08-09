import { useGetShopsQuery, selectShopById} from '../api/shopsSlice'
import styled from "styled-components"
import { useSelector } from 'react-redux'
import {Box, Typography, Link, Grid} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'


const GridStyled = styled(Grid) (function () {
  const theme = useTheme();
  return {
    color:theme.palette.text.secondary,
    border:`1px solid ${theme.palette.text.primary}`,
    borderRadius:'5px',
    [theme.breakpoints.up("mobile")]: {
      width:'100%'
   },
   [theme.breakpoints.up("tablet")]: {
      width:'40%'
   },
   [theme.breakpoints.up("desktop")]: {
    width:'30%'
 },
  '& .MuiTypography-root': {
    padding:'10px'
  }
  }
})


const ShopExtended = ({shopId}) => {
const shop = useSelector((state) => selectShopById(state, Number(shopId)))
const theme = useTheme();
  return (
    <GridStyled item xs={12} sm={5} md={3} lg={2} padding='10px' margin='10px'>
      <Typography sx={{fontWeight:'900', fontSize:'16px'}}>{shop?.title}</Typography>
      <Typography> {shop.adress} </Typography>
      <Typography>{'+38 555-55-55'}</Typography>
      <Typography><Link sx={{color:`${theme.palette.text.secondary}`}} component={RouterLink} to={`${shopId}`}>{'See shop  >>'}</Link> </Typography>
    </GridStyled>
  )
}

export default ShopExtended