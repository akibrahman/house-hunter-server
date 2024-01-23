import express from "express";
import { IndexController } from "../Controllers/Controllers.js";

export const IndexRoute = express.Router();

IndexRoute.get("/", IndexController);
