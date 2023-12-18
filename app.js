require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");

const app = express();

const URL = process.env.DB_URL;

app.use(express.json());

async function main() {
  await mongoose.connect(URL);
  console.log("connected to database");
}
main().catch((err) => console.log(err));

app.use("/product", productRouter.router);

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT: ${process.env.PORT}`);
});
