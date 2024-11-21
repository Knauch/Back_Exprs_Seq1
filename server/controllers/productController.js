
const db = require('../models')

//image upload part
const multer = require('multer')
const path = require('path')

//create our Main model
const Product = db.products
const Review = db.reviews

//main work

//1. create product
const addProduct = async (req, res) => {

  //info that will come from API
  let info = {
    image: req.file.path, // image path in the server
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: !!req.body.published
  }

  const product = await Product.create(info)
  res.status(200).send(product)
  console.log(product)

}

//2. get all products

const getAllProducts = async (req, res) => {

  try {
    let products = await Product.findAll()
    res.status(200).send(products)
  } catch (err) {
    res.status(500).send('Error retrieving products'); // Handle errors if they occur
  }
}

//3. get single product

const getOneProduct = async (req, res) => {

  let id = req.params.id
  let product = await Product.findOne({ where: { id: id } })
  res.status(200).send(product)

}

//4. update single product
const updateProduct = async (req, res) => {

  let id = req.params.id
  const product = await Product.update(req.body, { where: { id: id } })
  res.status(200).send(product)

}

//5. delete single product

const deleteProduct = async (req, res) => {

  let id = req.params.id
  await Product.destroy({ where: { id: id } })
  res.status(200).send('Product is deleted successfully')

}

//6. get published product

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
    where: { id: id }
  })

  res.status(200).send(data)
}

//8. setting the image related stuf

//cd means callback function with folowing props, null - if no error , and 'Images' meaning local folder in the project
// Date.now() + path..... meaning setting unique file name

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// general settings (just do it) .single('image') - is refering to the product model where we define the image if use .array('images', 3) - for multiple images
const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if (mimeType && extname) {
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
}).single('image')


module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
  getAllProducts,
  getPublishedProduct,
  getProductReviews,
  upload
}