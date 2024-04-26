import React, {useEffect, useState} from 'react'
// import { useSelector } from "react-redux";
import { useGetShopsQuery} from '../api/shopsSlice'
import ShopExtended from './ShopExtended';
import {useGetDrugsQuery} from '../api/drugsToShopsSlice'


const ShopsListExtended = () => {

    const { data:shops, isLoading:isLoadingShops, isSuccess:isSuccessShops, isError, error } = useGetShopsQuery('getShops')

    let contentShops;
    if (isLoadingShops) {
      contentShops = <p>"Loading..."</p>;
    } else if (isSuccessShops) {
      contentShops = shops.ids.map(shopId => <ShopExtended key={shopId} shopId={shopId}/>)
    } 

    const { data:drugs, isLoading:isLoadingDtS, isSuccess:isSuccessDtS} = useGetDrugsQuery('getDrugs')
    

    let drugsList;
    if (isLoadingDtS) {
        drugsList = <p>"Loading..."</p>;
    } else if (isSuccessDtS) {
        // drugsList = drugs.ids.map(drugId => 

        //     console.log(drugs.entities[drugId])

        // )
        console.log(drugs);//only the last one is shown
    } 
  
 
        
    return(

        <div className='shopsMenuExtended'>
          <h2 className='shopsTitle'>Shops:</h2>
            <ul className='shopsList'>
                {contentShops}
            </ul>

        </div>


    );
}

export default ShopsListExtended