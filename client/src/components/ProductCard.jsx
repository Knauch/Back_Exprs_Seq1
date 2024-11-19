import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

  return (
    <>
      <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>

          <Card.Title> Price $: {product.price}</Card.Title>
          <Card.Text>
            Description: {product.description}
          </Card.Text>
          <Link to={`/product/${product.id}`}>
            <Button variant="secondary">Detail</Button>
          </Link>
        </Card.Body>


      </Card>

    </>
  )
}

export default ProductCard