import { Elysia } from "elysia";
import { node } from "@elysiajs/node";

const app = new Elysia({
  adapter: typeof Bun === "undefined" ? node() : undefined,
})
  .get("/home", () => {
    return "Home";
  })
  .onError(() => {
    console.log("Error");
  })
  .onRequest(({ request, redirect }) => {
    if (new URL(request.url).pathname !== "/home") {
      return redirect("http://localhost:3000/home");
    }
  })
  .listen(3000);

const res = await fetch("http://localhost:3000/redirect-me", {
  redirect: "manual",
});

console.log("status", res.status);

await app.stop(true);
