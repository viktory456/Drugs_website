import React from 'react'
import { useGetShopsQuery} from '../api/api'


const Shop = ({shopId}) => {

    const { shop } = useGetShopsQuery('getShops', {
        selectFromResult: ({ data }) => ({
            shop: data?.entities[shopId]
        }),
    })

  return (
    <article className='shopItem'>
    <h2>{shop.name}</h2>
    {/* <p>{shop.adress}</p> */}
</article>
  )
}

export default Shop