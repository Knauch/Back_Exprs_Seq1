module.exports = (sequelize, DataTypes) => {
  //This creates a database table (if not already existing) with columns for title, price, description, and published


const Review = sequelize.define("review", {
  // Defines a Product model with the following attributes:
  rating: {
      type: DataTypes.INTEGER
  },
  description: {
      type: DataTypes.TEXT
  }
})

return Review

}