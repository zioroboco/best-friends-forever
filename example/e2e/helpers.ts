import { Handler } from "@zioroboco/bff/types"
import { Route } from "playwright"
import { invoke } from "@zioroboco/bff/lib/invoke"

export const routeWithHandler = (handler: Handler) => async (route: Route) => {
  const result = await invoke({
    handler,
    event: {
      path: `/${route.request().url().split("/").slice(-1)}`,
      httpMethod: route.request().method(),
      body: route.request().postData(),
    },
  })

  route.fulfill({
    status: result.statusCode,
    body: result.body,
  })
}
