
module.exports = (sequelize, DataTypes) => {

  //This creates a database table (if not already existing) with columns for title, price, description, and published


const Product = sequelize.define('product', {

  // Defines a Product model with the following attributes:

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.TEXT
  },
  published: {
    type: DataTypes.BOOLEAN
  }
  

})

return Product
}