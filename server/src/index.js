const { conn } = require('./db.js');

conn.sync({ force: true}).then(async() => {
    try {
        console.log("Database connected")
    } catch (error) {
        console.log("error", error)        
    }
})