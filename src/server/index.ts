import { ProductRouter } from "../router/products.router";
import { UserRouter } from "../router/users.router";
import { CategoriesRouter } from "../router/categories.router";
import { OrdersRouter } from "../router/orders.router";
import { CustomerRouter } from "../router/customer.router";

import * as express from "express";

export class Index {
  public routerProduct = new ProductRouter();
  public routerUsers = new UserRouter();
  public routerCategories = new CategoriesRouter();
  public routerOrdes = new OrdersRouter();
  public routerCustomer = new CustomerRouter();

  constructor() {}
  public routerApi(app: any) {
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/products", this.routerProduct.product);
    router.use("/categories", this.routerCategories.category);
    router.use("/users", this.routerUsers.user);
    router.use("/orders", this.routerOrdes.order);
    router.use("/customers", this.routerCustomer.customer);
  }
}
