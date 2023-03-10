// Insertamos todos los modelos
import { User, UserSchema } from "./user.model";
import { Customer, CustomerSchema } from "./customer.model";
import { Category, CategorySchema } from "./category.model";
import { Product, ProductSchema } from "./product.model";
import { Order, OrderSchema } from "./order.model";
import { OrderProduct, OrderProductSchema } from "./order-product.model";

function setupModels(sequelize: any) {
  // Iniciamos todos los modelos
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}
export default setupModels;
