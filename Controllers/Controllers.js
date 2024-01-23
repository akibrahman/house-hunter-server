import bcrypt from "bcrypt";
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
    const RegisteredUser = await UserModel.create({
      ...user,
      password: hash,
    });
    console.log(RegisteredUser);
  });
};

export { AddUserController, IndexController };
