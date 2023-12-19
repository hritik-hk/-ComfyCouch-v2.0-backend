const { Color } = require('../model/color');

exports.fetchColors= async (req, res) => {
  try {
    const colors = await Color.find({});
    res.status(200).json(colors);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createColor = async (req, res) => {
  const color = new Color(req.body);
  try {
    const doc = await color.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};


