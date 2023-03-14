import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";
import { Index } from "./router/server";
("./app/server/index");
import { ErrorHandler } from "./middlewares/error.handler";
import Auth from "./middlewares/auth.handler";
import { IndexAuth } from "./utils/auth/index";

const app = express();
const port = process.env.PORT || 3000;
const error = new ErrorHandler();
const auth = new IndexAuth();


app.use(passport.initialize());
app.use(express.json());
const whitelist = ["http://localhost:8080", "https://myapp.co"];
const options = {
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));
auth.ngOnInit();

app.get("/", (req: any, res: any) => {
  res.send("Hola mi server en express");
});
app.get("/nueva-ruta", Auth.chackApiKey, (req: any, res: any) => {
  res.send("Hola, soy una nueva ruta");
});
const indexApi = new Index();
indexApi.routerApi(app);

app.use(error.logErrors);
app.use(error.ormErrorHandler);
app.use(error.boomErrorHandler);
app.use(error.errorHandler);
app.listen(port, () => {
  console.log("Mi port" + port);
});
