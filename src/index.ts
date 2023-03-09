import * as express from "express";
import * as cors from "cors";
import { Index } from "./server";
("./app/server/index");
import { ErrorHandler } from "./middlewares/error.handler";

const app = express();
const port = process.env.PORT || 3000;
const error = new ErrorHandler();

app.use(express.json());
const whitelist = ["http://localhost:8080", "https://myapp.co"];
const options = {
  origin: (origin:any, callback:any) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));

app.get("/", (req: any, res: any) => {
  res.send("Hola mi server en express");
});

app.get("/nueva-ruta", (req: any, res: any) => {
  res.send("Hola, soy una nueva ruta");
});
const indexApi = new Index();
indexApi.routerApi(app);

app.use(error.logErrors);
app.use(error.ormErrorHandler)
app.use(error.boomErrorHandler);
app.use(error.errorHandler);
app.listen(port, () => {
  console.log("Mi port" + port);
});
