const boom = require('@hapi/boom');
import Config from "../config/config";

class Auth {

  static chackApiKey(req:any, res:any, next:any) {
    const apiKey = req.query['api'];
    if (!apiKey) {
      return next(boom.unauthorized('Unauthorized'));
    }
    if (apiKey !== Config.apiKey) {
      return next(boom.unauthorized('Unauthorized'));
    }
    return next();
  }
}

export default Auth;