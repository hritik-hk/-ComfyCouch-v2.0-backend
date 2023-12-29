require("dotenv").config();
const express = require("express");
const cors = require('cors');
const passport = require('passport');

const {connectToDB}= require("./config/mongoose");
const productRouter = require("./routes/product");
const brandRouter=require("./routes/brand");
const categoryRouter=require("./routes/category");
const colorRouter=require("./routes/color");
const userRouter=require("./routes/user");
const authRouter=require("./routes/auth");
const cartRouter=require("./routes/cart");
const variantRouter=require("./routes/variant");
const orderRouter=require("./routes/order");

const app = express();

//connect to database
connectToDB();

app.use(cors());//allows the react app to make HTTP requests to Express application
app.use(express.json());

// Passing the global passport object into the configuration function
require('./config/passport')(passport);

// this will initialize the passport object on every request
app.use(passport.initialize());


app.use("/product", productRouter.router); // "/product" is the base path
app.use("/brand", brandRouter.router);
app.use("/category", categoryRouter.router);
app.use("/color", colorRouter.router);
app.use("/user",userRouter.router);
app.use("/auth",authRouter.router);
app.use("/cart",cartRouter.router);
app.use("/variant",variantRouter.router);
app.use("/order",orderRouter.router);

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT: ${process.env.PORT}`);
});
