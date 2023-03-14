const boom = require("@hapi/boom");
import Config from "../config/config";

class Auth {
  static chackApiKey(req: any, res: any, next: any) {
    const apiKey = req.query["api"];
    if (!apiKey) {
      return next(boom.unauthorized("Unauthorized"));
    }
    if (apiKey !== Config.apiKey) {
      return next(boom.unauthorized("Unauthorized"));
    }
    return next();
  }
  static chackAdminRole(req: any, res: any, next: any) {
    const roleUser = req.user;
    if (roleUser != "admin") {
      next();
    } else {
      next(boom.unauthorized("Unauthorized"));
    }
  }
  static chackRoles(...roles: any) {
    return (req: any, res: any, next: any) => {
      const roleUser = req.user;
      if (roles.include(roleUser)) {
        next();
      } else {
        next(boom.unauthorized("Unauthorized"));
      }
    };
  }
}

export default Auth;
