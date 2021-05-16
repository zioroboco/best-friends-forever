import { fetch } from "cross-fetch"
import Koa from "koa"
import Router from "koa-router"
import serverless from "serverless-http"

type Dependencies = { fetch: typeof fetch }

export const init = ({ fetch }: Dependencies) => {
  const app = new Koa()
  const router = new Router({
    prefix: BFF_VERSION ? `/${BFF_VERSION}` : undefined,
  })

  router.get("/hello", async (ctx, next) => {
    const { json: data } = await fetch("https://httpbin.org/anything", {
      method: "POST",
      body: JSON.stringify({ name: "world" }),
    }).then(response => response.json())

    ctx.body = {
      message: data?.name
        ? `Hello ${data.name}!`
        : "Something went wrong, but that's okay! ❤️",
    }

    return next()
  })

  app.use(router.routes())
  app.use(router.allowedMethods())

  return serverless(app)
}

export const handler = init({ fetch })
