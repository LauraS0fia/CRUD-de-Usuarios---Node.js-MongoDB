// db.js
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/tech_crud', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Conectado ✔");
    } catch (err) {
        console.error("Error conectando MongoDB ❌", err);
    }
}

module.exports = connectDB;