const { Product } = require("../model/product");
const { Variant } = require("../model/variant");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save(); //mongodb document
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductDetailByIds = async (req, res) => {
  const productId = req.params.productId;
  const variantId = req.params.variantId;

  try {
    const product = await Product.findById(productId);
    const variant = await Variant.findById(variantId);
    const data = {
      productDetail: product,
      selectedVariant: variant
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

exports.fetchAllProducts=async(req,res)=>{
  try{
    const products=await Product.find({});
    res.status(200).json(products);
  }
  catch(error){
    res.status(400).json(error);
  }
}