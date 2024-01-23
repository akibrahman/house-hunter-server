import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { IndexRoute } from "./Routes/IndexRoute.js";
import { UserRoute } from "./Routes/UserRoute.js";

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME });

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      //   "https://task-management-system-akib.web.app",
      //   "https://task-management-system-akib.firebaseapp.com",
    ],
    //   credentials: true,
    //   optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use("/", IndexRoute);
app.use("/user", UserRoute);

app.listen(port, () => {
  console.log(`House Hunter Server is Running on Port - ${port}`);
});
