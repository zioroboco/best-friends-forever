import { Route } from "playwright"
import { invoke } from "@zioroboco/bff/lib/invoke"
import type { Handler } from "@zioroboco/bff"

export const routeWithHandler = (handler: Handler) => async (route: Route) => {
  const bffResponse = await invoke({
    handler,
    event: {
      httpMethod: route.request().method(),
      path: route.request().url().split(`/bff/${BFF_SERVICE}`)[1],
      body: route.request().postData(),
    },
  })

  route.fulfill({
    status: bffResponse.statusCode,
    body: bffResponse.body,
  })
}
