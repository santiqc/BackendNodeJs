import Config from "../config/config";
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const UserService = require("./user.service");
const service = new UserService();

export class AuthService {
  constructor() {}

  public async getUser(email: string, password: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  public signToken(user: any) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, Config.jwtSecret);
    return {
      user,
      token,
    };
  }

  public async sendMail(email: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: Config.mailerEmail,
        pass: Config.mailerPassword,
      },
    });

    await transporter.sendMail({
      from: `"Foo Boo 👻" <${Config.mailerEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Nuevo correo de prueba", // Subject line
      text: "Estoy usando Nodemailer!", // plain text body
      html: "<b>Holaaaaaaaaaa!</b>", // html body
    });

    return { message: "Mail sent" };
  }
}
