const mongoose = require('mongoose')
const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_DB_URL}`)
        console.log(`database is connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDB