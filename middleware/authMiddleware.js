const passport = require('passport');
exports.isAuth = () => {
    return passport.authenticate("jwt", { session: false })
  };