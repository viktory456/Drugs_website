import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchCart } from './features/api/cartSlice';
import { fetchCoupons } from './features/api/couponsSlice';
import { fetchShops } from './features/api/shopsSlice';
import { fetchMeds } from './features/api/medsSlice';
import {fetchMedsShops} from './features/api/medsShopsSlice';
import { fetchOrders } from './features/api/ordersSlice';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from './features/api/api';

store.dispatch(fetchCart())
store.dispatch(fetchCoupons())
store.dispatch(fetchMeds())
store.dispatch(fetchMedsShops())
store.dispatch(fetchOrders())
store.dispatch(fetchShops())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
{/* <ApiProvider api={apiSlice}> */}
      <Router>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </Router>
      {/* </ApiProvider> */}
</Provider>
);


