require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const brandRouter=require("./routes/brand");
const categoryRouter=require("./routes/category");
const colorRouter=require("./routes/color");
const userRouter=require("./routes/user");
const authRouter=require("./routes/auth");

const app = express();

const URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(URL);
  console.log("connected to database");
}
main().catch((err) => console.log(err));


app.use("/product", productRouter.router); // "/product" is the base path
app.use("/brand", brandRouter.router);
app.use("/category", categoryRouter.router);
app.use("/color", colorRouter.router);
app.use("/user",userRouter.router);
app.use("/auth",authRouter.router);

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT: ${process.env.PORT}`);
});
