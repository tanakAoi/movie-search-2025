import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

/* let client;
let clientPromise: Promise<MongoClient>; */

/* eslint-disable no-var */
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
/* eslint-enable no-var */

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

const client = new MongoClient(uri, options);

/* if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
} */
if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect().catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  });
}

const clientPromise = global._mongoClientPromise;

export default clientPromise;
