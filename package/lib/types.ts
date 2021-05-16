import type {
  Context,
  APIGatewayProxyEvent as Event,
  APIGatewayProxyEventV2 as EventV2,
  APIGatewayProxyResult as Result,
  APIGatewayProxyResultV2 as ResultV2,
} from "aws-lambda"

export type { Context, Event, Result }

export type Handler = (
  event: Event | EventV2,
  context: Context
) => Promise<Result | ResultV2>

declare global {
  var BFF_SERVICE: string
  var BFF_VERSION: string
}

export const endpoint = (endpoint: `/${string}`) =>
  `/bff/${BFF_SERVICE}/${BFF_VERSION}` + endpoint
