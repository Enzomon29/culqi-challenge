import Joi from 'joi';
import luhn from 'luhn';
import { APIGatewayProxyResult } from 'aws-lambda';
import { saveToken } from '../models/Token.model';
import { EventType } from '../utils/constants';
import GenerateTokenRequest from '../interfaces/GenerateTokenReq.interface';
import GenerateTokenResponse from '../interfaces/GenerateTokenRes.interface';
import TokenService from './Token.service';
import ResponseService from './Response.service';

export default class GenerateTokenService {

  constructor(private tokenService: TokenService) { }

  static validateRequest (data: GenerateTokenRequest) : void | APIGatewayProxyResult {
    const generateTokenSchema = Joi.object().keys({
      publicKey: Joi.string().required(),
      email: Joi.string().required().email(),
      cardNumber: Joi.string().required().pattern(/^\d{13,16}$/),
      cvv: Joi.string().required().pattern(/^\d{3,4}$/),
      expirationYear: Joi.string().required().pattern(/^\d{4}$/),
      expirationMonth: Joi.string().required().pattern(/^\d{2}$/)
    });

    const joiResponse : Joi.ValidationResult = generateTokenSchema.validate(data);

    if (joiResponse.error) {
      console.log('>> Error: Schema');
      return ResponseService.getResponse({ error: [ joiResponse.error.details[0].message ] }, 401, EventType.apiGatewayEvent);
    }

    const isValidCar = luhn.validate(data.cardNumber);

    if (!isValidCar) {
      console.log('>> Error: InvalidCar');
      return ResponseService.getResponse( { error: [ 'Número de tarjeta inválido.' ] }, 401, EventType.apiGatewayEvent);
    }

    const expirationMonth : number = Number(data.expirationMonth);

    if (expirationMonth < 1 || expirationMonth > 12) {
      console.log('>> Error: ExpirationMonth');
      return ResponseService.getResponse( { error: [ 'El campo "expirationMonth" debe estar en el rango de 1..12' ] }, 401, EventType.apiGatewayEvent);
    }

    const currentYear : number = (new Date()).getFullYear();
    const sentYear = Number(data.expirationYear);

    if (currentYear + 5 < sentYear) {
      console.log('>> Error: ExpirationYear');
      return ResponseService.getResponse( { error: [ 'El campo "expirationYear" es inválido' ] }, 401, EventType.apiGatewayEvent);
    }

    const validDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const emailDomain : string = data.email.split('@')[1];

    if (validDomains.indexOf(emailDomain) === -1) {
      console.log('>> Error: EmailDomain');
      return ResponseService.getResponse( { error: [ 'El campo "emailDomain" es inválido' ] }, 401, EventType.apiGatewayEvent);
    }
  }

  public async createToken(request: GenerateTokenRequest) : Promise<GenerateTokenResponse> {
    const token = this.tokenService.createToken();

    await saveToken(request, token);

    return { token } as GenerateTokenResponse;
  }

};
