import MongoDBService from '../service/MongoDB.service';
import GenerateTokenRequest from '../interfaces/GenerateTokenReq.interface';
import RetrieveTokenRequest from '../interfaces/RetrieveTokenReq.interface';

export const saveToken = async (request: GenerateTokenRequest, token: string) => {
  const mongoService = new MongoDBService(process.env.MONGO_USER, process.env.MONGO_PASSWORD, process.env.MONGO_CLUSTER, process.env.MONGO_DATABASE);
  const db = await mongoService.connectToDb();
  const collection = db.collection('tokens');

  return collection.insertOne({ ...request, token, createdAt: new Date() });
}

export const getToken = async (token: string, publicKey: string) => {
  const mongoService = new MongoDBService(process.env.MONGO_USER, process.env.MONGO_PASSWORD, process.env.MONGO_CLUSTER, process.env.MONGO_DATABASE);
  const db = await mongoService.connectToDb();
  const collection = db.collection('tokens');

  return collection.findOne({ token, publicKey }, { projection: { createdAt: 0 } });
};
