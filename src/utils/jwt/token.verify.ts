import * as jwt from "jsonwebtoken";

export class TokenVerify {
  public keySecret: string = "";
  public token:string = "ExampleToken";

  constructor() {
    this.keySecret = "KeySanti";
  }
  public verifyToken(token: any, secret: any) {
    return jwt.verify(token, secret);
  }

  public payload() {
    return this.verifyToken(this.token, this.keySecret);
  }
}
