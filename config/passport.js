const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const {User} =require('../model/user');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// `jwtFromRequest` and `secretOrKey` are required
//algorithms is optional
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
  passReqToCallback: true 
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    
    //  JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, async function(req, jwt_payload, done) {
        console.log(jwt_payload);
         // assigning the `sub` property on the JWT_payload with user:_id
        try {
            const user = await User.findOne({_id: jwt_payload.sub}, "_id email name role");
        
            if (!user) {
              return done(null, false); //return null in error and false as user doesn't exist
            }
            else{
                req.user = user; // Assign the user object to req.user
                return done(null, user);
            }
        
          } catch (err) {
                return done(err,false);
          }
       
        
    }));
}