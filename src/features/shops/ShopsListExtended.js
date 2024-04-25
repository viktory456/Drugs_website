import React, {useEffect, useState} from 'react'
// import { useSelector } from "react-redux";
import { useGetShopsQuery} from '../api/shopsSlice'
import ShopExtended from './ShopExtended';



const ShopsListExtended = () => {

    const { data:shops, isLoading:isLoadingShops, isSuccess:isSuccessShops, isError, error } = useGetShopsQuery('getShops')

    let contentShops;
    if (isLoadingShops) {
      contentShops = <p>"Loading..."</p>;
    } else if (isSuccessShops) {

      contentShops = shops.ids.map(shopId => <ShopExtended key={shopId} shopId={shopId}/>)
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