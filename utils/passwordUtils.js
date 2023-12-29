const crypto = require('crypto');

function genPassword(password) {
  const salt = crypto.randomBytes(32);
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  
  return {
    salt: salt,
    hash: genHash
  };
}

function validPassword(password, hash, salt) {
  // Hash user-entered password using PBKDF2 with SHA-512, generating a Buffer
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return crypto.timingSafeEqual(hashedPassword, hash);
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;