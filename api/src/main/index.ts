import { App } from "@/infra/http";
import { router } from "./routes";
import "@/infra/config/schedule";

const app = new App(router);
const port = Number(process.env.PORT);

app.listen(port);
