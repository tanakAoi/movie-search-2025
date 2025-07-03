import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
};

let client;
let clientPromise: Promise<MongoClient>;

/* eslint-disable no-var */
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
/* eslint-enable no-var */

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;

export default clientPromise;
