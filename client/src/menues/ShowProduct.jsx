import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';



const ShowProduct = () => {

  const [products, setProducts] = useState([])

  //call API only 1 time we need to use useEffect and seving it to the state by setProducts
  useEffect(() => {
    const getProductsData = async () => {
      const { data } = await axios.get('/api/products/allProducts')
      console.log(data)
      setProducts(data)
    }
    getProductsData()
  }, [])

  return (
    <Container className='mt-5'>
      <h1 className='text-center'>All The Products</h1>
      <hr className="mx-auto " />
      <Row className=" justify-content-center g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ShowProduct;