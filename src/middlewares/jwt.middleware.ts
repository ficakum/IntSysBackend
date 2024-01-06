import passport from 'passport';
import {
  ExtractJwt,
  StrategyOptions,
  Strategy as JwtStrategy,
  VerifiedCallback,
} from 'passport-jwt';

import { User } from '../models/user.model';
import config from '../configs/env.config';
import userService from '../services/user.service';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

passport.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new JwtStrategy(options, async (payload: any, done: VerifiedCallback) => {
    try {
      if (payload.exp < Date.now() / 1000) {
        console.log('here');
        return done(null, false, { message: 'Access token expired' });
      }

      const user: User = await userService.getUser(payload.id);

      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error, false);
    }
  }),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authenticationMiddleware: any = passport.authenticate('jwt', {
  session: false,
});

export default authenticationMiddleware;
