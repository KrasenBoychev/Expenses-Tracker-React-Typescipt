const mongoose = require('mongoose');
const { MONGODB_CREDENTIALS } = require('../credentials');

function connectDatabase() {
  mongoose
    .connect('mongodb://localhost:27017/', {
      dbName: 'lights-store'
    })

  // mongoose
  //   .connect(
  //     `mongodb+srv://${MONGODB_CREDENTIALS}@cluster0.zovge.mongodb.net/`,
  //     {
  //       dbName: 'lights-store',
  //     }
  //   )

    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      console.log('Connected to your database');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { connectDatabase };
