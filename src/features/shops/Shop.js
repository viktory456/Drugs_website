import { useGetShopsQuery} from '../api/shopsSlice'
import { NavLink } from "react-router-dom"
import styled from "styled-components";

const NavUnlisted = styled.ul`

  // display: flex;
  padding: 0;
  // width: 300px;
  // justify-content: center;
  // align-items: center;
  // column-gap: 35px;
  margin:0;

  a {
    text-decoration: none;
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: darkslategrey;
    font-size: 1.3rem;
    list-style: none;
    width: 90%;
    height: 60px;
    text-align: center;
    line-height: 100%;
    border: 1px solid darkslategrey;
    border-radius: 10px;
    margin: 20px auto;
    background-color: white;
  }
  li:hover {
    background-color: antiquewhite;
    cursor: pointer;
  }
`;


const Shop = ({shopId}) => {

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
      exact><li>{shop.name}</li></NavLink>
    </NavUnlisted>
  )
}

export default Shop