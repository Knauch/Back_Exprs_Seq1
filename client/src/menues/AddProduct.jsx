import React, { useState } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



const AddProduct = () => {

  //fields for the product to fill
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [productImage, setProductImage] = useState('')

  //so after submitting we will go to the product menu
  const navigate = useNavigate()

  //handler for POST to the API
  const addProductHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior


   

    const formData = new FormData()

    formData.append('image', productImage)
    formData.append('title', title)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('published', true)



    await axios.post('/api/products/addProduct', formData)

    //used to go to the allProducts page AFTER submitting
    navigate('/products')
  }




  return (
    <Container className='justify-content-center mt-5 '>
      <h1 className='text-center'>Add Product</h1>
      <hr />
      <Form onSubmit={addProductHandler} method='POST' encType='multipart/from-data'>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>
            Title
          </Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fileName">
          <Form.Label>Upload Product Image</Form.Label>
          <Form.Control 
          type="file" 
          name='image' 
          size='lg'
          onChange={(e) => setProductImage(e.target.files[0])} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>
            Price
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              type="number" />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>
            Description
          </Form.Label>
          <Form.Control
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            as='textarea' />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  )
}

export default AddProduct;