import { MongoClient } from 'mongodb';
import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class MongoEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<MongoClient>) {
    super();
  }

  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  protected async cleanDatabase(): Promise<void> {
    const collections = await this.collections();

    for (const collection of collections) {
      await (await this.client()).db().dropCollection(collection);
    }
  }

  private async collections(): Promise<string[]> {
    const client = await this.client();
    const collections = await client
      .db()
      .listCollections(undefined, { nameOnly: true })
      .toArray();

    return collections.map(collection => collection.name);
  }

  public async addCourseWithId(id: string): Promise<void> {
    const client = await this.client();
    await client.db().collection("courses").updateOne({ _id: id } ,{$set: { id, name: 'Test Course!', duration: '1', description: 'Trust me, this is a test course' } }, { upsert: true });
  }

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  public async close(): Promise<void> {
    return (await this.client()).close();
  }
}
