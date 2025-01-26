import { Elysia } from "elysia";
import { node } from "@elysiajs/node";

const app = new Elysia({
  adapter: typeof Bun === "undefined" ? node() : undefined,
})
  .get("/home", () => {
    return "Home";
  })
  .onError(({ error }) => {
    console.log("Error", error);
  })
  .onRequest(({ request, redirect }) => {
    if (new URL(request.url).pathname !== "/home") {
      return redirect("/home");
    }
  })
  .listen(3000);

const res = await fetch("http://localhost:3000/redirect-me", {
  redirect: "manual",
});

console.log("status", res.status);

await app.stop(true);
