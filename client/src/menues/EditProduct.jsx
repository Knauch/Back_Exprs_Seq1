import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {

  //grabing the state to fill the input with existing data
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {

    const getDataById = async () => {
      
      const { data } = await axios.get(`/api/products/${id}`)

      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
    }
    getDataById()
  }, [id])

  //constructing the data with NEW info for posting to the DB
  const updateHandler = async (event) => {
    event.preventDefault()

    const data = {
      title: title,
      price: price,
      description: description,
      published: true
    }

    await axios.put(`/api/products/${id}`, data)

    navigate(`/product/${id}`)
  }

  return (

    <Container className='justify-content-center mt-5 '>
      <h1 className='text-center'>Edit Product</h1>
      <hr />
      <Form onSubmit={updateHandler}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>
            Title
          </Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>
            Price($)
          </Form.Label>
          <Form.Control
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="number" placeholder="$" />
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
          Update Product
        </Button>
      </Form>
    </Container>

  )
}

export default EditProduct