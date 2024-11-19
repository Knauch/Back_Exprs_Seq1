import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from 'axios';

const ProductDetail = (product) => {

  //so we can get the ID from the APP
  const { id } = useParams()

  //so we can go back to all products after buttun action
  const navigate = useNavigate()

  //fields for the product to fill
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [reviews, setReviews] = useState([])

  const [newTextReview, setNewTextReview] = useState('')
  const [newStarRating, setNewStarRating] = useState(1); // newStarRating state initialized to 1

  //call API only 1 time we need to use useEffect and seving it to the state by setProducts
  useEffect(() => {
    const getSingleProductData = async () => {
      const { data } = await axios.get(`/api/products/getProductReview/${id}`)
      setTitle(data.title)
      setPrice(data.price)
      setDescription(data.description)
      setReviews(data.review)

    }
    getSingleProductData()
  }, [id])


  const addProductReviewHandler = async (event) => {
    event.preventDefault();

    const data = {
      product_id: id,
      newStarRating,
      description: newTextReview,
    };

    try {
      await axios.post(`/api/products/addReview/${id}`, data);
      const updatedReviews = [...reviews, { newStarRating, description: newTextReview }];
      setReviews(updatedReviews); // Update state with new review
      setNewTextReview('');
      setNewStarRating(1); // Reset newStarRating
    } catch (error) {
      console.error('Failed to add review', error);
    }
  };

  const handlenewStarRatingChange = (newnewStarRating) => {
    setNewStarRating(newnewStarRating);
  };

  return (
    <>
      <Container>
        <h1 className='text-center mt-5'>Product Details</h1>
        <hr />

        <Card className='shadow-lg m-5 p-3 rounded' style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Product Name: {title}</Card.Title>
            <Card.Title>Price: ${price}</Card.Title>
            <Card.Text>Description: {description}</Card.Text>
          </Card.Body>
          <div className="d-flex flex-column gap-2 m-3">
            <Link to={`/product/edit/${id}`}>
              <Button
                className="w-100"
                variant="outline-primary"
                size="sm"
              >
                Edit
              </Button>
            </Link>
            <Button
              className="w-100"
              variant="outline-danger"
              size="sm"
              onClick={() => {
                axios.delete(`/api/products/${id}`);
                navigate('/products');
              }}
            >
              Delete
            </Button>
          </div>
          <h4>Reviews:</h4>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="mb-3">
                  <div>
                    <strong>Rating:</strong>
                    {/* Render stars based on rating */}
                    {[...Array(5)].map((_, index) => (
                      index < review.rating ? (
                        <FaStar key={index} color="gold" />
                      ) : (
                        <FaRegStar key={index} color="gold" />
                      )
                    ))}
                  </div>
                  <div>
                    <strong>Review:</strong> {review.description}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews for this product YET</p>
          )}
        </Card>
      </Container>

      <Container>
        <h1 className='text-center mt-5'>Add Review</h1>
        <hr />

        <Form onSubmit={addProductReviewHandler}>
          <Form.Group className='mb-3' controlId='newStarRating'>
            <Form.Label>newStarRating</Form.Label>
            <div>
              <ReactStars
                count={5} // Number of stars
                size={24} // Size of stars
                activeColor="gold" // Color of active stars
                value={newStarRating} // Current newStarRating value
                onChange={handlenewStarRatingChange} // Function to call when newStarRating changes
              />
            </div>
          </Form.Group>

          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Review Text</Form.Label>
            <Form.Control
              as='textarea'
              value={newTextReview}
              onChange={(event) => setNewTextReview(event.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Add Review
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ProductDetail;