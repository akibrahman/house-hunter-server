import express from "express";
import {
  AddHouseController,
  DeleteOneHouses,
  GetAllHouses,
  GetFilteredHouses,
  GetOneHouses,
  UpdateOneHouses,
} from "../Controllers/Controllers.js";

export const HouseRoute = express.Router();

//! For House
HouseRoute.post("/add", AddHouseController);
HouseRoute.get("/all-houses", GetAllHouses);
HouseRoute.get("/filtered-houses", GetFilteredHouses);
HouseRoute.get("/get-one/:id", GetOneHouses);
HouseRoute.post("/update/:id", UpdateOneHouses);
HouseRoute.delete("/delete/:id", DeleteOneHouses);
