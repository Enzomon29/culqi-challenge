import { APIGatewayProxyResult } from 'aws-lambda';

export default class Request {
  constructor() { }

  static getResponse(response : object | string, statusCode: number, _responseType : string) : APIGatewayProxyResult {
    return {
      statusCode,
      body: JSON.stringify({
        payload: response
      })
    };
  }
};
