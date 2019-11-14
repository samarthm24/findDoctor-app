const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/product.route'); // Imports routes for the products
const app = express();


// checkout https://www.npmjs.com/package/cors to configure headers as per your needs.
const cors = require('cors')

// Set up mongoose connection
// const mongoose = require('mongoose');
// let dev_db_url = 'mongodb://localhost:27017/MyDb';
// const mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors()) //enabled cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use('/products', product);
app.use('/api',product);

let port = 8000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
