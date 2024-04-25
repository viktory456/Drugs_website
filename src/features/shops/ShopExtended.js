import { useGetShopsQuery} from '../api/shopsSlice'
import { NavLink } from "react-router-dom"
import styled from "styled-components";

const NavUnlisted = styled.li`

  list-style: none;

//   padding: 0;
  width: 300px;
  height: 200px;

//   margin:0;
  border: 1px solid darkslategrey;
  border-radius: 10px;

  a {
    text-decoration: none;
    color: darkslategrey;
    font-size: 1.3rem;
  }

  li {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;

    
    // width: 90%;
    // height: 60px;
    // text-align: center;
    // line-height: 100%;
    // border: 1px solid darkslategrey;
    // border-radius: 10px;
    // margin: 20px auto;
    // background-color: white;
  }
//   li:hover {
//     background-color: antiquewhite;
//     cursor: pointer;
//   }
`;


const ShopExtended = ({shopId}) => {

    const { shop } = useGetShopsQuery('getShops', {
        selectFromResult: ({ data }) => ({
            shop: data?.entities[shopId]
        }),
    })


  return (
    <NavUnlisted>
      <NavLink to={`${shopId}`}
        style={({ isActive}) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
          };
        }}
      exact>
        <div className='shopDetailed'>
            <div>
                {shop.name}
            </div>
            <div>
                {shop.adress}
            </div>
        </div>
        </NavLink>
    </NavUnlisted>
  )
}

export default ShopExtended