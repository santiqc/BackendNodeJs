import * as boom from '@hapi/boom';

export class ValidateHandler {
  public validator(schema: any, property: any) {
    return (req: any, res: any, next: any) => {
      const data = req[property];
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        next(boom.badRequest(error));
      }
      next();
    };
  }
}
