import { NavLink } from "react-router-dom"
import ShopsList from "../features/shops/ShopsList"
import styled from "styled-components";

const NavUnlisted = styled.ul`

  display: flex;
  padding: 0;
  width: 300px;
  justify-content: center;
  align-items: center;
  column-gap: 35px;

  a {
    text-decoration: none;
  }

  li {
    color: darkslategrey;
    font-size: 1.3rem;
    position: relative;
    list-style: none;
  }

  .current {
    li {
      border-bottom: 2px solid black;
    }
  }
`;

const Header = () => {
    return (
        <header className="Header">
            <NavUnlisted>
                {/* <ul className="mainMenu"> */}
                    <NavLink to="/" activeClassName="current" exact><li>Shops</li></NavLink>
                    <div class="vl"></div>
                    <NavLink to="cart" activeClassName="current" exact><li>Shopping Cart</li></NavLink>
                {/* </ul> */}
            </NavUnlisted>
        </header>
    )
}

export default Header