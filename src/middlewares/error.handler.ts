export class ErrorHandler {
  public logErrors(err:any, req:any, res:any, next:any) {
    console.error(err);
    next(err);
  }

  public errorHandler(err:any, req:any, res:any, next:any) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }

  public boomErrorHandler(err:any, req:any, res:any, next:any) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    }
    next(err);
  }
}
