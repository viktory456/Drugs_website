import ShopsList from "./features/shops/ShopsList";
import { MainPage } from "./features/mainPage/MainPage";
import ShoppingCart from "./features/shops/ShoppingCart";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import ShopsListExtended from "./features/shops/ShopsListExtended";
import { ShopPage } from "./features/shops/ShopPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<MainPage />} />

        <Route path="cart">
          <Route index element={<ShoppingCart />} />
        </Route>

        <Route path="shops" >
          <Route index element={<ShopsListExtended/>}/>
          <Route path=":shopId" element={<ShopPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
