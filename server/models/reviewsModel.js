module.exports = (sequelize, DataTypes) => {
  //This creates a database table (if not already existing) with columns for title, price, description, and published


  const Review = sequelize.define("review", {
    // Defines a Product model with the following attributes:
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure rating is required
      validate: {
        min: 1,
        max: 5, // Ensure rating is between 1 and 5
        isInt: true, // Ensure it's an integer
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  })

  return Review

}