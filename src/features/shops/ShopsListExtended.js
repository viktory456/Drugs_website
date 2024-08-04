import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { selectAllShops} from '../api/shopsSlice'
import { selectAllMeds} from '../api/medsSlice'
import ShopExtended from './ShopExtended'
import {Box, Grid} from '@mui/material'


const ShopsListExtended = () => {

    const shops = useSelector(selectAllShops)
    let contentShops;
    contentShops = shops.map(shopId => <ShopExtended key={shopId.id} shopId={shopId.id}/>)
    const meds = useSelector(selectAllMeds)
        
    return(
        <Box >
            <Grid container spacing={{xs:1,md:2}} justifyContent='flex-start'> {contentShops} </Grid>
        </Box>
    );
}

export default ShopsListExtended