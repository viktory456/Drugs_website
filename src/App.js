import ShopsList from "./features/shops/ShopsList";
// import { useGetShopsQuery } from "./features/api/api"
import ShoppingCart from "./features/shops/ShoppingCart";
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';

function App() {

  // const { data, error, isLoading } = useGetShopsQuery()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<ShopsList />} />

        <Route path="cart">
          <Route index element={<ShoppingCart />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
