import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}
const client = new MongoClient(uri);

app.put("/user-register", async (req, res) => {
  const { id, name } = req.body;

  if (!id || typeof id !== "string") {
    console.error("Invalid id:", id);
    res.status(400).json({ error: "Invalid id format" });
    return;
  }

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          username: name,
          country: "",
          avatar: "",
          language: "",
        },
      }
    );

    if (result.matchedCount === 0) {
      console.error("User not found:", id);
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const { country, language, username } = req.body;

  try {
    await client.connect();
    const db = client.db();

    const result = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { country, language, username } }
      );

    if (result.modifiedCount === 0) {
      res.status(200).json({ message: "No changes made" });
      return;
    }

    res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
});
