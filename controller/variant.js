const { Variant } = require("../model/variant");

exports.createProductVariant = async (req, res) => {
    const productVariant = new Variant(req.body);
    try {
      const doc = await productVariant.save(); //mongodb document
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };

exports.fetchAllProductVariants = async (req, res) => {
  // filter = {"category":["sofa-seating","home-decor"]}
  // sort = {_order="ascending"}
  // pagination = {_page:1,_limit=10}

  let query = Variant.find({});
  let totalProductsQuery = Variant.find({});

  console.log(req.query);

  if (req.query.category) {
    query = query.find({ category: {$in:req.query.category.split(',')} });
    totalProductsQuery = totalProductsQuery.find({
      category: {$in:req.query.category.split(',')},
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: {$in:req.query.brand.split(',')} });
    totalProductsQuery = totalProductsQuery.find({ brand: {$in:req.query.brand.split(',') }});
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.updateProductVariant = async (req, res) => {
    const { variantId } = req.params;
    const updateFields = req.body;
  
    try {
      const updatedVariant = await Variant.findOneAndUpdate(
        { _id: variantId },
        updateFields,
        { new: true }
      );
  
      if (!updatedVariant) {
        return res.status(404).json({ error: "Product Variant not found" });
      }
  
      return res.status(200).json(updatedVariant);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
