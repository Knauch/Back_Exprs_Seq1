const db = require('../models')

// model
const Review = db.reviews

// functions

//1. Add Review to specific product

const addReview = async (req, res) => {

    const id = req.params.id

    try {
        const { rating, description } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).send({ message: "Rating must be an integer between 1 and 5." });
        }

        const data = {
            product_id: id,
            rating: rating,
            description: description || "", // Allow empty description
        };

        const review = await Review.create(data);
        res.status(200).send(review);
    } catch (error) {
        res.status(500).send({ message: "Failed to add review", error: error.message });
    }


}

// 2. Get All Reviews

const getAllReviews = async (req, res) => {

    const reviews = await Review.findAll({})
    res.status(200).send(reviews)

}

module.exports = {
    addReview,
    getAllReviews
}