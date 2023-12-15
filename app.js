require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");

const app = express();

const URL=process.env.DB_URL;

async function main() {
  await mongoose.connect(URL);
  console.log("connected to database");
}
main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ status: "working" });
});

app.listen(process.env.PORT, () => {
  console.log(`server started at PORT: ${process.env.PORT}`);
});
