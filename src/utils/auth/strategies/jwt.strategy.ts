import { Strategy, ExtractJwt } from "passport-jwt";
import Config from "../../../config/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Config.jwtSecret,
};
const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});
export default JwtStrategy;
