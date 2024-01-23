import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";

//! Root Controller
const IndexController = async (req, res) => {
  res.send("House Hunter Server is Running");
};

//! Addin new User To DB
const AddUserController = async (req, res) => {
  const user = await req.body;
  const existingUser = await UserModel.find({ email: user.email });
  if (existingUser.length != 0) {
    console.log("User Already Exists");
    res.send({ msg: "user exists" });
    return;
  }
  bcrypt.hash(user.password, 10, async (error, hash) => {
    if (error) {
      console.log(error);
      res.send({ msg: "Hashing error" });
      return;
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5h",
      }
    );
    const registeredUser = await UserModel.create({
      ...user,
      password: hash,
    });
    res
      .cookie("HouseHunterToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ msg: "User Registered & Token created", user: registeredUser });
  });
};

export { AddUserController, IndexController };
