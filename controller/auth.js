const { User } = require("../model/user");
const { genPassword, validPassword } = require("../utils/passwordUtils");
const { issueJWT } = require("../utils/jwtUtils");

//register or login
exports.createUser = async (req, res) => {
  try {
    const { hash, salt } = genPassword(req.body.password);
    const user = new User({
      email: req.body.email,
      password: hash,
      salt: salt,
      name: req.body.name,
    });
    const doc = await user.save();
    res.status(201).json({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      role: doc.role,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ success: false, msg: "user not found" });
    }

    const isValid = validPassword(req.body.password, user.password, user.salt);

    if (isValid) {
      const { token, expires } = issueJWT(user); //issue token/jwt

      console.log(expires);

      res
        .cookie("jwt", token, {
          maxAge: expires,
          httpOnly: true,
        })
        .status(200)
        .json({ token: token });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAuth = async (req, res) => {
  if (req.user && req.cookies) {
    token = req.cookies["jwt"];
    res.status(200).json({ token: token });
  } else {
    res.sendStatus(401);
  }
};
