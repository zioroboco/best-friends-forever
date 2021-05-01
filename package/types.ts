import type {
  Context,
  APIGatewayProxyEvent as Event,
  APIGatewayProxyResult as Result,
} from "aws-lambda"

export type { Context, Event, Result }

export type Handler = (event: Event, context: Context) => Promise<Result>

declare global {
  var BFF_NAME: string
  var BFF_VERSION: string
  var BFF_PREFIX: string
}
