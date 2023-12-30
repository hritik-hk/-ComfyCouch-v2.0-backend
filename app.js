require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const { connectToDB } = require("./config/mongoose");
const productRouter = require("./routes/product");
const brandRouter = require("./routes/brand");
const categoryRouter = require("./routes/category");
const colorRouter = require("./routes/color");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const variantRouter = require("./routes/variant");
const orderRouter = require("./routes/order");
const { isAuth } = require("./middleware/authMiddleware");

const app = express();

//connect to database
connectToDB();

//middlewares
app.use(cors()); //allows the react app to make HTTP requests to Express application
app.use(express.json());
app.use(express.static("dist"));
app.use(cookieParser());

// Passing the global passport object into the configuration function
require("./config/passport")(passport);

// this will initialize the passport object on every request
app.use(passport.initialize());

app.use("/product", isAuth(), productRouter.router); // "/product" is the base path
app.use("/brand", isAuth(), brandRouter.router);
app.use("/category", isAuth(), categoryRouter.router);
app.use("/color", isAuth(), colorRouter.router);
app.use("/user", isAuth(), userRouter.router);
app.use("/auth", authRouter.router);
app.use("/cart", isAuth(), cartRouter.router);
app.use("/variant", isAuth(), variantRouter.router);
app.use("/order", isAuth(), orderRouter.router);

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT: ${process.env.PORT}`);
});
