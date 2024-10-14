//basic settings START
const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')

// making conection with sequelize so it can use all the db config
const sequelize = new Sequelize(

    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false, // Disables string-based operators for security, operators are used to construct complex queries by allowing you to specify conditions beyond simple equality

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire, // Maximum time to try getting a connection (in ms).
        idle: dbConfig.pool.idle // Time a connection can be idle before being released (in ms).
    }
}
)

// Authentication
sequelize.authenticate()
    .then(() => {
        console.log('Conected..')
    })
    .catch(err => {
        console.log('Error: ' + err)
    })

const db = {} // Initializes an empty object db to hold Sequelize-related configurations.

db.Sequelize = Sequelize // Stores the Sequelize library itself in the db object, so it can be accessed later if needed (for things like defining models, importing Sequelize constants, etc.).
db.sequelize = sequelize // Stores the initialized Sequelize instance (the connection to the database) in the db object, allowing you to use this connection elsewhere in your project (for running queries, syncing models, etc.).

//defines two models (products and reviews). Synchronizes these models with the database (without dropping existing tables). Logs a message when the sync process is complete. 
db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('RE-Sync DONE')
    })

// //1 to many Relation conecting product with reviews
db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})


module.exports = db
