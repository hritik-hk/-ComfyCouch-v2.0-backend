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
              rating: "$variants.rating"
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

exports.fetchProductByIds = async (req, res) => {
  const productId = req.params.productId;
  const variantId = req.params.variantId;

  try {
    const product = await Product.findById(productId);
    const variant = await Product.findOne(
      { _id: productId, "variants._id": variantId },
      { "variants.$": 1 }
    );
    const data = {
      productDetail: product,
      selectedVariant: variant.variants[0],
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updateFields = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateVariant = async (req, res) => {
  const { productId, variantId } = req.params;
  const updateFields = req.body;

  try {
    // Construct an object with the fields to update in the variant
    const variantUpdate = {};
    for (const key in updateFields) {
      variantUpdate[`variants.$.${key}`] = updateFields[key];
    }

    // Update specific fields of the variant within the product
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, "variants._id": variantId },
      { $set: variantUpdate },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product or variant not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
};
