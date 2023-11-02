import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";

if (!DATABASE_HOST) {
  throw new Error("DATABASE_HOST environment variable is not defined");
}

// Connect to MongoDB
mongoose.connect(`mongodb://${DATABASE_HOST}:27017/travel_destinations`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3 * 1000,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("Error connecting to MongoDB");
  console.error(err);
  process.exit(1);
});
