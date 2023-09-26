import GenerateTokenRequest from '../interfaces/GenerateTokenReq.interface';
import { getToken } from '../models/Token.model';

export default class TokenService {
  constructor() { }

  createToken() : string {
    const length : number = 16;
    const allowChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let token = '';

    for (let iterator = 0; iterator < length; ++iterator) {
      const randomChar = allowChars.charAt(Math.floor(Math.random() * allowChars.length));
      token += randomChar;
    }

    return token;
  }

  async getToken(token: string, publicKey: string) : Promise<any>  {
    return getToken(token, publicKey);
  }

};
