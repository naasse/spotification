import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";

import {
  logonHandler,
  refreshTokenHandler,
  callbackHandler,
} from "./handlers/logon";

import { env } from "./environment";

const app = express();
const port = env.port ?? "8888";

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", logonHandler);

app.get("/refresh_token", refreshTokenHandler);

app.get("/callback", callbackHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running on port ${port}`);
});
