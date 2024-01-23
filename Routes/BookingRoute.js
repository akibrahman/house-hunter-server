import express from "express";
import {
  AddBookingController,
  DeleteBookingController,
  GetOneBookingController,
  GetOwnerBookingController,
  GetUserBookingController,
} from "../Controllers/Controllers.js";

export const BookingRoute = express.Router();

//! For Booking
BookingRoute.post("/add", AddBookingController);
BookingRoute.get("/get-one/:id", GetOneBookingController);
BookingRoute.get("/get/:email", GetUserBookingController);
BookingRoute.get("/get-booked/:email", GetOwnerBookingController);
BookingRoute.delete("/delete/:id", DeleteBookingController);
