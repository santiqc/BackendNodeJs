import * as jwt from "jsonwebtoken";

export class TokenSign {
  public jwtConfig: any = {};
  public payload: any = {};
  public keySecret: string = "";

  constructor() {
    this.keySecret = "KeySanti";
    this.jwtConfig = {
      expiresIn: "7d",
    };
    this.payload = {
      sub: 1,
      role: "customer",
    };
  }
  public signToken(payload: any, secret: any, jwtConfig: any) {
    return jwt.sign(payload, secret, jwtConfig);
  }

  public token() {
    return this.signToken(this.payload, this.keySecret, this.jwtConfig);
  }
}
