import express from "express";
import {
  AddHouseController,
  GetAllHouses,
  GetFilteredHouses,
} from "../Controllers/Controllers.js";

export const HouseRoute = express.Router();

//! For Adding User
HouseRoute.post("/add", AddHouseController);
HouseRoute.get("/all-houses", GetAllHouses);
HouseRoute.get("/filtered-houses", GetFilteredHouses);
