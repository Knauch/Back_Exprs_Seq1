//basic settings START

//dbconfig file serves as a centralized configuration for your database connection settings.
//uses these settings to establish and manage connections to your database


module.exports = {
    HOST: 'localhost', // Specifies the hostname where your database server is running.
    USER: 'root', // The username used to authenticate with the database
    PASSWORD: '',
    DB: 'new_phone_shop_db', // The name of the database you want to connect to.
    dialect: 'mysql', // Specifies the type of SQL dialect Sequelize should use.
    
    pool: { // Description: Configuration for Sequelize's connection pool. Purpose: Connection pooling helps manage multiple database connections efficiently, improving performance and resource utilization
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}