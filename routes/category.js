const express = require("express");
const { fetchCategories, createCategory } = require("../controller/category");

const router = express.Router();

router.get("/", fetchCategories).post("/", createCategory);

exports.router = router;
