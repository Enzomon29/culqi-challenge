import { APIGatewayProxyEvent } from 'aws-lambda';

export default class Request {
  constructor() { }

  static getRequest(event: APIGatewayProxyEvent) : object {
    const payload = event.body ? JSON.parse(event.body).payload : {}
    const bearerToken = event.multiValueHeaders.Authorization;
    const publicKey = bearerToken ? bearerToken[0].split(' ')[1] : '';

    const request : object = {
      ...event.pathParameters,
      ...event.queryStringParameters,
      ...payload,
      publicKey
    }

    return request;
  }
};
