import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import app from "./server.js";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main() {
  dotenv.config();
  const Db = process.env.MOVIEREVIEWS_DB_URI;
  const client = new MongoClient(Db);

  const port = process.env.PORT || 8000;

  try {
    // Connect to MongoDB cluster
    await client.connect();
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`server is running on port: ${port}`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main().catch(console.error);
