// import ShopsList from "../shops/ShopsList"
import { useGetDrugsShopsQuery, selectDtSById, selectAllDtS} from '../api/drugsShopsSlice'
import { useGetDrugsQuery, useGetDrugsByPriceQuery, selectAllDrugs, selectAllDrugsByPrice} from '../api/drugsSlice'
import Drug from "../drugs/Drug"
import { useMemo, useState, useEffect } from'react'
import { useSelector } from "react-redux"

export const DrugsList = ({shop}) => {
  const [sortedList, setSortedList] = useState(false)
  const [selectedShop, setSelectedShop] = useState(shop)
  function comparePrices(a, b) {return a.price - b.price};
  let drugsList;

  const drugs = useSelector(selectAllDrugs)
  const drugsFav = drugs.filter(drug => drug.favorite === true)
  const drugsNonFav = drugs.filter(drug => drug.favorite === false)
  const drugsFavSorted = drugsFav.sort(comparePrices)
  const drugsNonFavSorted = drugsNonFav.sort(comparePrices)

  const drugsShops = useSelector(selectAllDtS)
  const drugsChosen = useMemo(() => {
    let drugsChosenList = []
    for(let i =0; i < drugs.length; i++){
      if(drugs[i].shop_id === shop){
        drugsChosenList.push(drugs[i])
      }
    }
    return drugsChosenList
  }, [drugs, drugsShops, selectedShop])
  const drugsChosenFav = drugsChosen?.filter(drug => drug.favorite === true)
  const drugsChosenNonFav = drugsChosen?.filter(drug => drug.favorite === false)
  const drugsChosenFavSorted = drugsChosenFav.sort(comparePrices)
  const drugsChosenNonFavSorted = drugsChosenNonFav.sort(comparePrices)

  const sortedAllDrugs = useMemo(() => {
    const copiedFavSortedDrugs = drugsFavSorted.slice()
    const copiedNonFavSortedDrugs = drugsNonFavSorted.slice()
    const sortedAllDrugs = copiedFavSortedDrugs.concat(copiedNonFavSortedDrugs);
    // const sortedArrFav = copiedDrugs.reduce((acc, element) => {
    //   if (element.favorite === true) {return [element, ...acc]}
    //   return [...acc, element];
    // }, []);
    return sortedAllDrugs
  }, [drugs])
  const sortedDrugsChosen = useMemo(() => {
    const copiedChosenFavSortedDrugs = drugsChosenFavSorted.slice()
    const copiedChosenNonFavSortedDrugs = drugsChosenNonFavSorted.slice()
    const sortedDrugsChosen = copiedChosenFavSortedDrugs.concat(copiedChosenNonFavSortedDrugs);
    return sortedDrugsChosen
  }, [drugs, drugsShops, selectedShop])

  if(selectedShop === 'default'&&sortedList){
    drugsList = sortedAllDrugs.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
  }
  else if (selectedShop !== 'default'&&!sortedList) {
    drugsList = drugsChosen?.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
  } else if(selectedShop === 'default'&&!sortedList){
    drugsList = drugs?.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
  } else if (selectedShop !== 'default'&&sortedList) {
    drugsList = sortedDrugsChosen?.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
  }

const sortByPrice = () => { setSortedList(true) }
const resetSorting = () => { setSortedList(false) }
const selectAllShops = () => { setSelectedShop('default') }
useEffect(()=>{ setSelectedShop(shop) }, [shop])

  return (
    <>
      <div className='drugsMenu'> {drugsList} </div>
      <button className='buyButton' onClick={sortByPrice}>Sort by Price</button>
      <button className='buyButton' onClick={resetSorting}>Cancel Price Sorting</button>
      <button className='buyButton' onClick={selectAllShops}>Select All Shops</button> 
    </>
    )
}