const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notedown?directConnection=true"

const connectToMongo = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;