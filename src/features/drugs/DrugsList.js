import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetDrugsQuery} from '../api/drugsSlice'
import Drug from './Drug';



const DrugsList = () => {
    const { data:drugs, isLoading, isSuccess, isError, error } = useGetDrugsQuery('getDrugs')

    let contentDrugs;
    if (isLoading) {
        contentDrugs = <p>"Loading..."</p>;
    } else if (isSuccess) {
          contentDrugs = drugs.ids.map(drugId => <Drug key={drugId} drugId={drugId}/>)
    } 

 
        
    return(

        <div className='drugsMenu'>
          {contentDrugs}
        </div>



    );
}

export default DrugsList






