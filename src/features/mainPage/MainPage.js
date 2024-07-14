import { MedsList } from '../meds/MedsList'
import ShopsList from "../shops/ShopsList"
import { createContext, useContext, useState, useEffect } from "react"


const ShopChosen = createContext('hello');

export const MainPage = () => {


  const [shop, setShop] = useState('default');
  const [byPrice, setByPrice] = useState(false);
  const sortPrice = () => { setByPrice(true) } 

  return (
    <ShopChosen.Provider value={shop}>
    <div className='mainPage'>
        <ShopsList setShop={setShop}/>

        <MedsList shop={shop} byPrice={byPrice}/> 

    </div>
     </ShopChosen.Provider>
  )
}

export {ShopChosen}
