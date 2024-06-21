const express = require("express");
const cors = require("cors");

const { createExpressMiddleware } = require("@trpc/server/adapters/express");

const { initTRPC } = require("@trpc/server");

const t = initTRPC.create();

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "hi";
  }),
  logToServer: t.procedure.input((v) => {
    if (typeof v === "string") return v;

    throw new Error("invalid input please enter string");
  }).mutation((req) => {
    console.log(`Client Says: ${req.input}`);
    return true;
  }),
});

const app = express();

app.use(cors({ origin: "http://localhost:5000" }));

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(3000);

module.exports.AppRouter = appRouter;