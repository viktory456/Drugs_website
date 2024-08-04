import { selectAllDtS} from '../api/medsShopsSlice'
import { selectAllMeds } from '../api/medsSlice'
import Med from "./Meds"
import { useMemo, useState, useEffect } from'react'
import { useSelector } from "react-redux"
import {Stack, Grid, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ScrollButton from './ScrollButton'

export const MedsList = ({shop}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false) 
  const [sortedList, setSortedList] = useState(false)
  const [selectedShop, setSelectedShop] = useState(shop)
  function comparePrices(a, b) {return a.price - b.price}
  let medsList;

  const meds = useSelector(selectAllMeds)
  const medsFav = meds.filter(med => med.favorite === true)
  const medsNonFav = meds.filter(med => med.favorite === false)
  const medsFavSorted = medsFav.sort(comparePrices)
  const medsNonFavSorted = medsNonFav.sort(comparePrices)

  const medsShops = useSelector(selectAllDtS)
  const medsChosen = useMemo(() => {
    let medsChosenList = []
    for(let i =0; i < meds.length; i++){
      if(meds[i].shop_id === shop){
        medsChosenList.push(meds[i])
      }
    }
    return medsChosenList
  }, [meds, medsShops, selectedShop])
  const medsChosenFav = medsChosen?.filter(med => med.favorite === true)
  const medsChosenNonFav = medsChosen?.filter(med => med.favorite === false)
  const medsChosenFavSorted = medsChosenFav.sort(comparePrices)
  const medsChosenNonFavSorted = medsChosenNonFav.sort(comparePrices)

  const sortedAllMeds = useMemo(() => {
    const copiedFavSortedMeds = medsFavSorted.slice()
    const copiedNonFavSortedMeds = medsNonFavSorted.slice()
    const sortedAllMeds = copiedFavSortedMeds.concat(copiedNonFavSortedMeds);
    return sortedAllMeds
  }, [meds])
  const sortedMedsChosen = useMemo(() => {
    const copiedChosenFavSortedMeds = medsChosenFavSorted.slice()
    const copiedChosenNonFavSortedMeds = medsChosenNonFavSorted.slice()
    const sortedMedsChosen = copiedChosenFavSortedMeds.concat(copiedChosenNonFavSortedMeds);
    return sortedMedsChosen
  }, [meds, medsShops, selectedShop])

  if(selectedShop === 'default'&&sortedList){
    medsList = sortedAllMeds.map(medId => <Med medId={medId} key={medId.id} />);
  }
  else if (selectedShop !== 'default'&&!sortedList) {
    medsList = medsChosen?.map(medId => <Med medId={medId} key={medId.id} />);
  } else if(selectedShop === 'default'&&!sortedList){
    medsList = meds?.map(medId => <Med medId={medId} key={medId.id} />);
  } else if (selectedShop !== 'default'&&sortedList) {
    medsList = sortedMedsChosen?.map(medId => <Med medId={medId} key={medId.id} />);
  }

  useEffect(() => {
    // const item = document.querySelector('#gridContainer')
    window.addEventListener("scroll", (event) => {
      const scrolled = document.documentElement.scrollTop; 
      if (scrolled > 200){ 
      setVisible(true) 
      } 
      else if (scrolled <= 200){ 
      setVisible(false) 
      } 
    });
  }, []);





const sortByPrice = () => { setSortedList(true) }
const resetSorting = () => { setSortedList(false) }
const selectAllShops = () => { setSelectedShop('default') }
useEffect(()=>{ setSelectedShop(shop) }, [shop])
const heightCalc = `${Number(window.innerHeight)}`-200

  return (
    <Stack direction='row' sx={{paddingTop:{xs:'250px', md:'0px'}}} id='gridContainer'>
      <Grid container spacing={1} justifyContent={{xs:'space-between', md:'start'}} sx={{borderRadius:`5px`, paddingLeft:{xs:'0px', md:'200px'}, height:{xs:'100vh', sm:'100%'}, overflow:{xs:'scroll', sm:'hidden'}}}>{medsList}</Grid>

      <Stack direction='column' alignItems={{xs:'center'}} justifyContent={{xs:'center'}} spacing={1} sx={{position:`fixed`, right:{xs:'40px', sm:'50px', lg:'150px'}}}>
        <Stack>
          <Button variant='outlined' sx={{fontSize:{xs:'8px', sm:'12px', md:'16px'}, padding:{xs:'3px', md:'15px'}, margin:{xs:'3px', md:'10px'}}} onClick={sortByPrice}>Sort by Price</Button>
          <Button variant='outlined' sx={{fontSize:{xs:'8px', sm:'12px', md:'16px'}, padding:{xs:'3px', md:'15px'}, margin:{xs:'3px', md:'10px'}}} onClick={resetSorting}>Reset Sorting</Button>
          <Button variant='outlined' sx={{fontSize:{xs:'8px', sm:'12px', md:'16px'}, padding:{xs:'3px', md:'15px'}, margin:{xs:'3px', md:'10px'}}} onClick={selectAllShops}>All Shops</Button>
        </Stack>
        <ScrollButton variant='outlined' visible={visible}/>
      </Stack>

    </Stack>
    )
}