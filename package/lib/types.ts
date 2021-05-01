import type {
  APIGatewayProxyEvent as Event,
  APIGatewayProxyResult as Result,
} from "aws-lambda"

export { Event, Result }

export type Handler = (event: Event) => Promise<Result>
