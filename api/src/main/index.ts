import { App } from "@/infra/http";

const app = new App();
const port = Number(process.env.PORT);

app.listen(port);
