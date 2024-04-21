import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetShopsQuery } from '../api/shopsSlice'
import {useGetDrugsToShopsQuery} from '../api/shopsSlice'


export const ShopPage = () => {
    const { shopId } = useParams()
    const { shop } = useGetShopsQuery('getShops', {
        selectFromResult: ({ data }) => ({
            shop: data?.entities[shopId]
        }),
    })
    const { data:DrugsToShops, isLoading, isSuccess, isError, error } = useGetDrugsToShopsQuery(`${shopId}`)

    console.log(DrugsToShops);
    
  return (
    <div className='shopPage'>
        <div>{shop.name}</div>
        <div>{shop.adress}</div>
        <div>List of medicines</div>
    </div>

  )
}
