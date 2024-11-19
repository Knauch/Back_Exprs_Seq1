import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './menues/AddProduct';
import ProductDetail from './menues/ProductDetail';
import EditProduct from './menues/EditProduct';
import ShowProduct from './menues/ShowProduct';
import HomePage from './menues/HomePage';
import NavBar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route exact path='/addProduct' element={<AddProduct />} />
        <Route exact path='/products' element={<ShowProduct />} />
        <Route exact path='/product/edit/:id' element={<EditProduct />} />
        <Route exact path='/product/:id' element={<ProductDetail />} />
      </Routes>
    </Router>

  )
}

export default App;