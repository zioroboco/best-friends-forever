import { stubVersion } from "./util"
import type { Context, Event, Handler, Result } from "@zioroboco/bff/types"

type InvokeOptions = {
  /** The BFF handler function. */
  handler: Handler
  /** The api-gateway event with which the BFF will be invoked. */
  event: Partial<Event> & Pick<Event, "path">
}

/** Invoke the passed BFF handler function in the current node process. */
export async function invoke(options: InvokeOptions): Promise<Result> {
  return options.handler(
    { ...options.event, path: stubVersion(options.event.path) } as Event,
    {} as Context
  ) as Promise<Result>
}
