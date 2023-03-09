// Insertamos todos los modelos
import { User, UserSchema } from "./user.model";

function setupModels(sequelize: any) {
  // Iniciamos todos los modelos
  User.init(UserSchema, User.config(sequelize));
}
export default setupModels;
