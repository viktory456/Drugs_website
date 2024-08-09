import { selectAllDtS} from '../api/medsShopsSlice'
import { selectAllMeds } from '../api/medsSlice'
import Med from "./Meds"
import { useMemo, useState, useEffect } from'react'
import { useSelector } from "react-redux"
import {Stack, Grid, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ScrollButton from './ScrollButton'
import styled from "styled-components"

const GridContainer = styled(Grid) (function () {
  const theme = useTheme();
  return {
    borderRadius:`5px`,
    [theme.breakpoints.up("mobile")]: {
      // overflow:'scroll',
      height:'100vh', 
      paddingLeft:'0px',
      justifyContent:'space-between',  
    },
    [theme.breakpoints.up("laptop")]: {
      overflow:'hidden',
      height:'100%', 
      paddingLeft:'250px',
      justifyContent:'start'
    }
  }
})
const SortingButtons = styled(Button) (function () {
  const theme = useTheme();
  return {
    [theme.breakpoints.up("mobile")]: {
      margin:'3px',
      padding:'3px', 
      fontSize:'8px',
    },
    [theme.breakpoints.up("tablet")]: {
      fontSize:'12px'
    },
    [theme.breakpoints.up("laptop")]: {
      margin:'10px',
      padding:'15px', 
      fontSize:'16px'
    }
  }
})
const SortingButtonsAndScroll = styled(Stack) (function () {
  const theme = useTheme();
  return {

    [theme.breakpoints.up("mobile")]: {
         visibility:'hidden',

    },
    [theme.breakpoints.up("tablet")]: {
      margin:'3px',
      padding:'3px', 
      fontSize:'12px',
      right:'30px',
      top:'80px',
      visibility:'inherit',
      position:`fixed`,
    },
    [theme.breakpoints.up("laptop")]: {
      margin:'10px',
      padding:'15px', 
      fontSize:'16px',
    }
  }
})
const MedsContainer = styled(Stack) (function () {
  const theme = useTheme();
  return {

    [theme.breakpoints.up("mobile")]: {

    },
    [theme.breakpoints.up("tablet")]: {

    }
  }
})

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
// const heightCalc = `${Number(window.innerHeight)}`-200

  return (
    <MedsContainer direction='row' id='gridContainer'>
      <GridContainer container spacing={1}>{medsList}</GridContainer>

      <SortingButtonsAndScroll direction='column' alignItems='center' justifyContent='center' spacing={1}>
        <Stack spacing={2}>
          <SortingButtons variant='outlined' onClick={sortByPrice}>Sort by Price</SortingButtons>
          <SortingButtons variant='outlined' onClick={resetSorting}>Reset Sorting</SortingButtons>
          <SortingButtons variant='outlined' onClick={selectAllShops}>All Shops</SortingButtons>
        </Stack>
        <ScrollButton variant='outlined' visible={visible}/>
      </SortingButtonsAndScroll>

    </MedsContainer>
    )
}