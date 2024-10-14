const db = require('../models');

// create main Model
const Product = db.products
const Review = db.reviews

//main work

// 1. create product
const addProduct = async (req, res,) => {

    //info that will come from API
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: !!req.body.published 
    }
  
    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
  }

// 2. get all products
const getAllProducts = async (req, res) => {

    try{
      let products = await Product.findAll()
      res.status(200).send(products)
    }catch(err){
      res.status(500).send('Error retrieving products'); // Handle errors if they occur
    }
  }
  
// 3. get SINGLE products
const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id } })
    res.status(200).send(product)
}

// 4. update Product
const updateProduct = async (req, res) => {

    let id = req.params.id
    const product = await Product.update(req.body, { where: { id: id } })

    res.status(200).send(product)
}

// 5. delete product by id
const deleteProduct = async (req, res) => {

    let id = req.params.id

    await Product.destroy({ where: { id: id } })

    res.status(200).send('Product was successfully deleted')
}

// 6. get published product by id
const getPublishedProduct = async (req, res) => {

    const products = await Product.findAll({ where: { published: true } })

    res.status(200).send(products)
}

//7. conect 1 to many relation Product and Reviews
const getProductReviews = async (req, res) => {

    const id = req.params.id
  
    const data = await Product.findOne({
      include: [{
        model: Review,
        as: 'review'
      }],
      where: {id : id}
    })
  
    res.status(200).send(data)
  }
  

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews
}