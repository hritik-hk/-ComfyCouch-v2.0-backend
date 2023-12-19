const { User } = require("../model/user");

exports.createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ error: "invalid credentials" });
    } else {
      if (user.password === req.body.password) {
        res
          .status(200)
          .json({ id: user.id, name: user.name, email: user.email });
      } else {
        res.status(401).json({ error: "invalid credentials" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
