import { MongoClient } from 'mongodb';

let dataBaseConnection = null;

export default class MongoService {
  private url : string;
  private databaseName : string | undefined;

  constructor(private user: string | undefined, private password : string | undefined, clusterId: string | undefined, databaseName : string | undefined) {
    this.url = `mongodb+srv://${user}:${password}@${clusterId}.mongodb.net/?retryWrites=true&w=majority`
    this.databaseName = databaseName;
  }

  public async connectToDb () {
    if (!dataBaseConnection) {
      const client: MongoClient = new MongoClient(this.url);
      await client.connect();
      const db = client.db(this.databaseName);
      return db;
    }

    return dataBaseConnection;
  }
};
