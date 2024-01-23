import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  owner: String,
  bedroom: Number,
  bathroom: Number,
  size: Number,
  picture: String,
  availability: Boolean,
  date: Date,
  rent_per_month: Number,
  phone_number: String,
  description: String,
  renterName: String,
  renterEmail: String,
  renterPhoneNumber: String,
});

export const BookingModel = mongoose.model("Booking", bookingSchema);
