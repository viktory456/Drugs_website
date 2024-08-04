import {AppBar, Box, CssBaseline, IconButton, Toolbar, Stack, Divider, Link} from '@mui/material'
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'
import { Link as RouterLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import styled from "styled-components"


const Header = () => {
  const theme = useTheme();
    return (
        <Box>
          <CssBaseline/>
          <AppBar color='primary' component="nav">
        <Toolbar>
          <Link variant='h5' component={RouterLink} color={theme.palette.common.white} underline="none" to={"/"}>
            <IconButton color="inherit" size="large" sx={{ mr: 3 }}>
              <MedicationLiquidIcon />
            </IconButton>
          </Link>
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{bgcolor:`${theme.palette.common.white}`}}/>} spacing={2}>
            <Link component={RouterLink} sx={{color:`${theme.palette.text.primary}`, '&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}}} underline="none" to={"/"}>HOME</Link>
            <Link component={RouterLink} sx={{color:`${theme.palette.text.primary}`, '&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}}} underline="none" to={"/shops"}>SHOPS</Link>
            <Link component={RouterLink} sx={{color:`${theme.palette.text.primary}`, '&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}}} underline="none" to={"/cart"}>SHOPPING CART</Link>
            <Link component={RouterLink} sx={{color:`${theme.palette.text.primary}`, '&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}}} underline="none" to={"/history"}>HISTORY</Link>
            <Link component={RouterLink} sx={{color:`${theme.palette.text.primary}`, '&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}}} underline="none" to={"/coupons"}>COUPONS</Link>
          </Stack>
        </Toolbar>
      </AppBar>
            
        </Box>
    )
}

export default Header