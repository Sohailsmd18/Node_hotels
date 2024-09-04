const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person'); // Assuming you have a Mongoose model for Person

// LocalStrategy using POST method
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            console.log('Received credentials:', username, password);
            const user = await Person.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            const isPasswordMatch=user.comparePassword(password);
            if (isPasswordMatch) {
                return done(null,user);
            }else{
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

module.exports=passport;//Export configured passport
