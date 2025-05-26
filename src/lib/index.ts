import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);
const dbPromise = client.connect().then(() => client.db('rezepteapp'));

export async function getAllRecipes() {
  const db = await dbPromise;
  return db.collection('recipes').find().toArray();
}
