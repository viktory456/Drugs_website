import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetShopsQuery } from '../api/shopsSlice'
import {useGetDrugsToShopsQuery} from '../api/drugsToShopsSlice'


export const ShopPage = () => {
    const { shopId } = useParams()

    const { shop, isLoading: isLoadingShop, isSuccess:isSuccessShop } = useGetShopsQuery('getShops', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            shop: data?.entities[shopId],
            isLoading,
            isSuccess
        }),
    })

    const { data:drugsList, isLoading:isLoadingDtS, isSuccess:isSuccessDtS, isError, error } = useGetDrugsToShopsQuery(shopId)
    

    let DrugsToShops;
    if (isLoadingDtS) {
        DrugsToShops = <p>"Loading..."</p>;
    } else if (isSuccessDtS) {
        // DrugsToShops = drugsList.ids.map(id => <p>drugsList.entities[id].shopId</p>)
        console.log(drugsList);
    } 



  
    
  return (
    <div className='shopPage'>
        <div>{isSuccessShop && shop.name}</div>
        <div>{isSuccessShop && shop.adress}</div>
        <div>List of medicines</div>
    </div>

  )
}
