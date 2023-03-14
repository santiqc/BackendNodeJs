import * as bcrypt from "bcrypt";

export class HashPassword {
  public async hash(password: string) {
    return await bcrypt.hash(password, 10);
  }
  public async verify(password: string) {
    const getPassword = "asd";
    return await bcrypt.compare(password, getPassword);
  }
}
