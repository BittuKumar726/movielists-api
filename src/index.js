import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "../env",
});

const PORT = process.env.PORT || 5000;
// MongoDB configuration
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection Failed !!!", err);
  });
