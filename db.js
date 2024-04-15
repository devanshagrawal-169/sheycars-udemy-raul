const mongoose = require('mongoose');

function connectDB() {
  mongoose.connect(
    'mongodb+srv://rahullko0:7sDrVHnjxctlM2St@cluster0.rube9gc.mongodb.net/RoadConnect',
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on('connected', () => {
    console.log('Mongo DB Connection Successfull');
  });

  connection.on('error', () => { 
    console.log('Mongo DB Connection Error');
  });
}  

connectDB();

module.exports = mongoose;
