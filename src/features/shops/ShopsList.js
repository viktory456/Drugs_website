import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import Shop from './Shop';


const ShopsList = ({setShop}) => {

  // window.onscroll = function() {myFunction()};
  // var menu = document.getElementsByClassName("shopsTitle")[0];
  // console.log(menu);
  // var sticky = menu?.offsetTop;
  // function myFunction() {
    
  //   if (window.screenY >= sticky) {
  //     menu?.classList.add("sticky")
  //     console.log('sticky');
  //   } else {
  //     menu?.classList.remove("sticky");
  //     console.log('nonsticky');
  //   }
  // }

    const shops = useSelector(selectAllShops)
    let contentShops;
    contentShops = shops.map(shopId => <Shop setShop={setShop} key={shopId.id} shopId={shopId}/>)
         
    return(
      // <div className='sticky'>
        <div className='shopsMenu'>
          <h2 className='shopsTitle'>Shops:</h2>
          {contentShops}
        </div>
      // </div>
    );
}

export default ShopsList






