import { selectAllDtS, selectDtSById} from '../api/drugsShopsSlice'
import Drug from './Drug'
import { useSelector } from "react-redux"


const DrugsShops = ({shopId}) => {

  const drugsShops = useSelector(selectAllDtS)
  // const drugsChosen = useSelector(state => selectDtSById(state, Number(shopId)))
  const drugsChosen = drugsShops.filter(item =>item.shopId === shopId);
  const drugs = drugsChosen?.map(id => <Drug key={id.id} drugId={id}/>);

  return (

    <div className='drugsToShops'>
        {drugs}
    </div>
    // <NavUnlisted>
    //   <NavLink to={`/shops/${shopId}`}
    //     style={({ isActive}) => {
    //       return {
    //         fontWeight: isActive ? "bold" : "normal",
    //       };
    //     }}
    //     filtereddrugs={drugsList}
    //     onClick={filterDrugs}
    //     ><li>{shop.name}</li></NavLink>
    // </NavUnlisted>
  )
}

export default DrugsShops