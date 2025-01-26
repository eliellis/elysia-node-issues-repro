import { Elysia, t } from "elysia";
import { node } from "@elysiajs/node";

const app = new Elysia({
  adapter: typeof Bun === "undefined" ? node() : undefined,
})
  .onError(({ request }) => {
    return;
  })
  .post("/", ({ body }) => "OK", {
    body: t.Object({
      test: t.String(),
    }),
  })
  .listen(3000);

const res = await fetch("http://localhost:3000/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ bad: "" }),
});

console.log("status", res.status);

await app.stop(true);
