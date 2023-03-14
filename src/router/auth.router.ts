import * as express from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import Config from "./../config/config";

export class AuthRouter {
  public auth: express.Express;

  constructor() {
    this.auth = express();

    const routerAuth = express.Router();

    routerAuth.post(
      "/login",
      passport.authenticate("local", { session: false }),
      async (req, res, next) => {
        try {
          const user: any = req.user;
          const jwtConfig = {
            expiresIn: "7d",
          };
          const payload = {
            sub: user.id,
            role: user.role,
          };
          const token = jwt.sign(payload, Config.jwtSecret, jwtConfig);
          res.json({
            user,
            token,
          });
        } catch (error) {
          next(error);
        }
      }
    );

    this.auth.use(routerAuth);
  }
}
