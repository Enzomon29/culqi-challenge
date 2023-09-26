export default interface GenerateTokenRequest {
  publickKey: string,
  email: string,
  cardNumber: string,
  cvv: string,
  expirationYear: string,
  expirationMonth: string
};
