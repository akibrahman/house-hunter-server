import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";

//! Root Controller
const IndexController = async (req, res) => {
  res.send("House Hunter Server is Running");
};

//! Adding new User To DB
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
        expiresIn: "1h",
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
      .send({
        msg: "User Registered & Token created",
        user: registeredUser,
        success: true,
      });
  });
};

//! Find User from DB
const FindUserController = async (req, res) => {
  const token = req?.cookies?.HouseHunterToken;
  if (!token) {
    return res.send({ msg: "No Token", status: false });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.send({ msg: "Expired or wrong token", status: false });
    }
    console.log(decoded);
    const user = await UserModel.find({ email: decoded.email });
    res.send({ user: user[0], status: true });
  });
};

//! Login User from web
const LogInUserController = async (req, res) => {
  const user = await req.body;
  const data = await UserModel.find({ email: user.email });
  if (data.length == 0) {
    res.send({ msg: "Email is incorrect", status: false });
    return;
  }
  bcrypt.compare(user.password, data[0].password, (err, result) => {
    if (err) {
      res.send({ msg: "Something went wrong", status: false, err });
    } else if (result) {
      const token = jwt.sign(
        { email: data[0].email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res
        .cookie("HouseHunterToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ msg: "Password is correct", status: true, user: data[0] });
    } else {
      res.send({ msg: "Password is incorrect", status: false });
    }
  });
};

//! Logout User from web
const LogOutUserController = async (req, res) => {
  res
    .clearCookie("HouseHunterToken", {
      maxAge: 0,
      secure: true,
      sameSite: "none",
    })
    .send({ success: true });
};

export {
  AddUserController,
  FindUserController,
  IndexController,
  LogInUserController,
  LogOutUserController,
};
