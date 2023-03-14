import { Strategy } from "passport-local";
import * as boom from "@hapi/boom";
import * as bcrypt from "bcrypt";
import { UserService } from "../../../services/user-srv";

const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email: string, password: string, done: any) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.newData.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default LocalStrategy;
