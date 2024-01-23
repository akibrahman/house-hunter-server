import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  bedrooms: Number,
  bathrooms: Number,
  room_size: String,
  picture: String,
  availability: Boolean,
  date: Date,
  rent_per_month: Number,
  phone_number: Number,
  description: String,
});

export const HouseModel = mongoose.model("House", houseSchema);
