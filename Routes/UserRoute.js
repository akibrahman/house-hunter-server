import express from "express";
import {
  AddUserController,
  FindUserController,
  LogInUserController,
  LogOutUserController,
} from "../Controllers/Controllers.js";

export const UserRoute = express.Router();

//! For Adding User
UserRoute.post("/add", AddUserController);
UserRoute.get("/find", FindUserController);
UserRoute.get("/logout", LogOutUserController);
UserRoute.post("/login", LogInUserController);
