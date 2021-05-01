import type {
  Context,
  APIGatewayProxyEvent as Event,
  APIGatewayProxyResult as Result,
} from "aws-lambda"

export { Context, Event, Result }

export type Handler = (event: Event, context: Context) => Promise<Result>
