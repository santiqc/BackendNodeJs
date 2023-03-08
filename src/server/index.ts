import { ProductRouter } from "../router/products";
import * as express from 'express';

export class Index {
  
  public routerProduct = new ProductRouter();

  constructor() {
  }
  public routerApi(app: any) {
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/products", this.routerProduct.product);
    // router.use("/users", this.routerPorduct);
    // router.use("/categories", this.routerPorduct);
  }
}
