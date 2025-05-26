import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);
const dbPromise = client.connect().then(() => client.db('rezeptapp'));

export async function getAllRecipes() {
  const db = await dbPromise;
  return db.collection('recipes').find().toArray();
}

export async function insertRecipe(recipe: Record<string, any>) {
  const db = await dbPromise;
  return db.collection('recipes').insertOne(recipe);
}
