import Joi from 'joi';
import { APIGatewayProxyResult } from 'aws-lambda';
import { EventType } from '../utils/constants';
import TokenService from './Token.service';
import RetrieveTokenRequest from '../interfaces/RetrieveTokenReq.interface';
import GenerateTokenRequest from '../interfaces/GenerateTokenReq.interface';
import ResponseService from './Response.service';


export default class RetrieveTokenService {
  constructor(private tokenService: TokenService) { }

  static validateRequest (data: RetrieveTokenRequest) : void | APIGatewayProxyResult {
    const getDataCardSchema = Joi.object().keys({
      token: Joi.string().required().pattern(/^\w{16}$/),
      publicKey: Joi.string().required()
    });

    const joiResponse : Joi.ValidationResult = getDataCardSchema.validate(data);

    if (joiResponse.error) {
      console.log('>> Error: Schema');
      return ResponseService.getResponse({ error: [ joiResponse.error.details[0].message ] }, 401, EventType.apiGatewayEvent);
    }
  }

  public async getDataCard(request: RetrieveTokenRequest) : Promise<GenerateTokenRequest> {
    const data : GenerateTokenRequest = await this.tokenService.getToken(request.token, request.publicKey);
    return data;
  }  
};
