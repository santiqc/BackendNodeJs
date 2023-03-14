import { ProductRouter } from "../products.router";
import { UserRouter } from "../users.router";
import { CategoriesRouter } from "../categories.router";
import { OrdersRouter } from "../orders.router";
import { CustomerRouter } from "../customer.router";
import { AuthRouter } from "../auth.router"
import * as express from "express";

export class Index {
  public routerProduct = new ProductRouter();
  public routerUsers = new UserRouter();
  public routerCategories = new CategoriesRouter();
  public routerOrdes = new OrdersRouter();
  public routerCustomer = new CustomerRouter();
  public routerAuth = new AuthRouter();


  constructor() {}
  public routerApi(app: any) {
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/products", this.routerProduct.product);
    router.use("/categories", this.routerCategories.category);
    router.use("/users", this.routerUsers.user);
    router.use("/orders", this.routerOrdes.order);
    router.use("/customers", this.routerCustomer.customer);
    router.use("/auth", this.routerAuth.auth);
  }
}
