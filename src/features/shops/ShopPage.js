import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetShopsQuery } from '../api/shopsSlice'



export const ShopPage = () => {
    const { shopId } = useParams()

    const { shop, isLoading: isLoadingShop, isSuccess:isSuccessShop } = useGetShopsQuery('getShops', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            shop: data?.entities[shopId],
            isLoading,
            isSuccess
        }),
    })

   
    
  return (
    <div className='shopPage'>
        <div>{isSuccessShop && shop.name}</div>
        <div>{isSuccessShop && shop.adress}</div>
        <div>List of medicines</div>
    </div>

  )
}
