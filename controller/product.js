const { Product } = require("../model/product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save(); //mongodb document
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["sofa-seating","home-decor"]}
  // sort = {_order="ascending"}
  // pagination = {_page:1,_limit=10}

  const page = parseInt(req.query._page);
  const limit = parseInt(req.query._limit);

  const matchCriteria = {};
  const sortCriteria = {};
  const skip = limit * (page - 1);

  if (req.query.color) {
    matchCriteria["variants.color"] = req.query.color;
  }
  if (req.query.category) {
    matchCriteria["category"] = req.query.category;
  }
  if (req.query.brand) {
    matchCriteria["brand"] = req.query.brand;
  }

  if (req.query._sort) {
    sortCriteria["variants.price"] = req.query._sort == "ascending" ? 1 : -1;
  }

  try {
    const results = await Product.aggregate([
      { $unwind: "$variants" },
      ...(req.query.color || req.query.category || req.query.brand
        ? [{ $match: matchCriteria }]
        : []),
      ...(req.query._sort ? [{ $sort: sortCriteria }] : []),
      ...(req.query._page && req.query._limit
        ? [{ $skip: skip }, { $limit: limit }]
        : []),
      {
        $group: {
          _id: "$_id",
          variants: {
            $push: {
              _id: "$variants._id",
              title: "$variants.title",
              thumbnail: "$variants.thumbnail",
              color: "$variants.color",
              price: "$variants.price",
            },
          },
          brand: { $first: "$brand" },
          category: { $first: "$category" },
        },
      },
    ]);

    const data = results.map((result) => Product.hydrate(result));

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
