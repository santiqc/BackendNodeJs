import * as passport from "passport";
import LocalStrategy from "../auth/strategies/local.strategy";
import JwtStrategy from "../auth/strategies/jwt.strategy";

export class IndexAuth {
  public ngOnInit(): void {
    passport.use(LocalStrategy);
    passport.use(JwtStrategy);
  }
}
