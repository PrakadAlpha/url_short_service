const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');



const connectDb = async () => {
  try {
    await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Mongo connected..!');
  } catch (err) {
    console.error(err);
    console.log('Error connected mongo...');
    process.exit(1); 
  }
}

module.exports = connectDb;