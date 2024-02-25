const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authjwt = require("./helpers/jwt.js");
const errorHandler = require('./helpers/error-handlers.js');


require('dotenv/config');

app.use(cors());
app.options('*', cors());


const api = process.env.API_URL;



const productsRouter = require("./routers/products.js");
const categoriesRouter = require("./routers/categories.js");
const usersRouter = require("./routers/users.js");
const ordersRouter = require("./routers/orders.js");



//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authjwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//routers
app.use(`${api}products/`, productsRouter);
app.use(`${api}categories/`, categoriesRouter);
app.use(`${api}users/`, usersRouter);
app.use(`${api}orders/`, ordersRouter);


//Database
mongoose.connect(process.env.CONNECTION)
.then(()=>{
    console.log("Database is ready..");
})
.catch((err)=>{
    console.log(err);
})



app.listen(3000, () => {
    console.log("listening on port: http://localhost:3000");
});