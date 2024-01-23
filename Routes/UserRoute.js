import express from "express";
import { AddUserController } from "../Controllers/Controllers.js";

export const UserRoute = express.Router();

//! For Adding User
UserRoute.post("/add", AddUserController);
