import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { apiSlice } from './features/api/api';
import { shopsApiSlice } from './features/api/shopsSlice';
import { drugsApiSlice } from './features/api/drugsSlice';
import { cartApiSlice } from './features/api/cartSlice';

// store.dispatch(apiSlice.endpoints.getShops.initiate());

store.dispatch(drugsApiSlice.endpoints.getDrugs.initiate())
store.dispatch(shopsApiSlice.endpoints.getShops.initiate())
store.dispatch(cartApiSlice.endpoints.getCart.initiate())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <Router>
    <Routes>
      <Route path="/*" element={<App/>} />
    </Routes>
  </Router>
</Provider>
);


