import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import Request from '../../service/Request.service';
import Response from '../../service/Response.service';
import GenerateTokenService from '../../service/GenerateToken.service';
import RetrieveTokenService from '../../service/RetrieveToken.service';
import GenerateTokenRequest from '../../interfaces/GenerateTokenReq.interface';
import RetrieveTokenRequest from '../../interfaces/RetrieveTokenReq.interface';
import GenerateTokenResponse from '../../interfaces/GenerateTokenRes.interface';
import TokenService from '../../service/Token.service';
import { EventType } from '../../utils/constants';

export const generateToken: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const payload = Request.getRequest(event);
  const generateToken = new GenerateTokenService(new TokenService());

  const validationResponse : APIGatewayProxyResult | void = GenerateTokenService.validateRequest(payload as GenerateTokenRequest);

  if (validationResponse) {
    return validationResponse;
  }

  const token : GenerateTokenResponse = await generateToken.createToken(payload as GenerateTokenRequest);

  return Response.getResponse(token, 200, EventType.apiGatewayEvent);
};

export const retrieveToken: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const payload = Request.getRequest(event);
  const retrieveToken = new RetrieveTokenService(new TokenService());

  const validationResponse : APIGatewayProxyResult | void  = RetrieveTokenService.validateRequest(payload as RetrieveTokenRequest);

  if (validationResponse) {
    return validationResponse;
  }

  const cardInformation : GenerateTokenRequest = await retrieveToken.getDataCard(payload as RetrieveTokenRequest);

  return Response.getResponse(cardInformation, 200, EventType.apiGatewayEvent);
};
