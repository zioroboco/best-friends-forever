import type { Context, Event, Handler, Result } from "./types"

type InvokeOptions = {
  /** The BFF handler function. */
  handler: Handler
  /** The api-gateway event with which the BFF will be invoked. */
  event: Partial<Event>
}

/** Invoke the passed BFF handler function in the current node process. */
export async function invoke(options: InvokeOptions): Promise<Result> {
  return options.handler(
    options.event as Event,
    {} as Context
  ) as Promise<Result>
}
