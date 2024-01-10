require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const path = require("path");

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
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//connect to database
connectToDB();

//middlewares

app.use(
  cors({ //allows the react app to make HTTP requests to Express application
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());
app.use(express.static("dist"));
app.use(cookieParser());

// Passing the global passport object into the configuration function
require("./config/passport")(passport);

// this will initialize the passport object on every request
app.use(passport.initialize());

app.use("/api/product", isAuth(), productRouter.router); // "/product" is the base path
app.use("/api/brand", isAuth(), brandRouter.router);
app.use("/api/category", isAuth(), categoryRouter.router);
app.use("/api/color", isAuth(), colorRouter.router);
app.use("/api/user", isAuth(), userRouter.router);
app.use("/api/auth", authRouter.router);
app.use("/api/cart", isAuth(), cartRouter.router);
app.use("/api/variant", isAuth(), variantRouter.router);
app.use("/api/order", isAuth(), orderRouter.router);

//to make react router work in case of other routes doesnt match
app.get("*", (req, res) => res.sendFile(path.resolve("dist", "index.html")));

//accepting payments with stripe----------------------------------

app.post("/create-checkout-session", isAuth(), async (req, res) => {
  try {
    const { orderId, cartItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            unit_amount: item.price * 100, // converting price to paise for INR
            currency: "inr",
            product_data: {
              name: item.title,
            },
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `http://localhost:8080/order-success/${orderId}`,
      cancel_url: "http://localhost:8080/cart",
    });

    res.send({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT: ${process.env.PORT}`);
});
