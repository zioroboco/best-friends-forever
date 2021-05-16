import type {
  Context,
  APIGatewayProxyEvent as Event,
  APIGatewayProxyResult as Result,
} from "aws-lambda"

export type { Context, Event, Result }

export type Handler = (event: Event, context: Context) => Promise<Result>

declare global {
  var BFF_SERVICE: string
  var BFF_VERSION: string
}

export const endpoint = (endpoint: `/${string}`) =>
  `/bff/${BFF_SERVICE}/${BFF_VERSION}` + endpoint
