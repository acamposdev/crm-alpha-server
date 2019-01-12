// **************************************************
// * Winston logger properties
// **************************************************
module.exports.logger = {
    file: {
        level: 'debug'
    },
    console: {
        level: 'debug'
    }
}

// **************************************************
// * DB Connection properties 
// **************************************************
module.exports.db = {
    host: 'localhost',
    port: 1433,
    database: 'CRM-ALPHA',
    user: 'admin',
    password: 'admin',
    dialect: 'sqlite'
}