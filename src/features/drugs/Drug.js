import { useGetDrugsQuery} from '../api/drugsSlice'


const Drug = ({drugId}) => {

    const { drug } = useGetDrugsQuery('getDrugs', {
        selectFromResult: ({ data }) => ({
            drug: data?.entities[drugId]
        }),
    })

  return (
    <article className='drugItem'>
        <h2>{drug.name}</h2>
        {/* <p>{drug.price}</p> */}
    </article>
  )
}

export default Drug