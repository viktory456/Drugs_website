import { selectAllDtS, selectDtSById} from '../api/medsShopsSlice'
import Med from './Meds'
import { useSelector } from "react-redux"
import Grid from '@mui/material/Grid'


const MedsShops = ({shopId}) => {

  const medsShops = useSelector(selectAllDtS)
  const medsChosen = medsShops.filter(item =>item.shopId === shopId);
  const meds = medsChosen?.map(id => <Med key={id.id} medId={id}/>);

  return (

    <Grid container justifyContent='flex-start'>{meds}</Grid>
  )
}

export default MedsShops