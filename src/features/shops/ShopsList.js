import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery} from '../api/api'
import {selectShopsResult} from '../api/api'
import Shop from './Shop';



const ShopsList = () => {

    const { data:shops, isLoading, isSuccess, isError, error } = useGetShopsQuery('getShops')

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        
        content = shops.ids.map(shopId => <Shop key={shopId} shopId={shopId}/>)
    } else if (isError) {
        content = <p>{error}</p>;
    }

    // console.log(shops);
        
    return(
      <div className='shopsMenu'>
      <h2 className='shopsTitle'>Shops:</h2>
      {content}
      </div>

    );
}

export default ShopsList






