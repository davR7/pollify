import { App } from "@/infra/http";
import { router } from "./routes";

const app = new App(router);
const port = Number(process.env.PORT);

app.listen(port);
