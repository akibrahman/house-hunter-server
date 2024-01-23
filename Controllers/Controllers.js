import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HouseModel } from "../Models/HouseModel.js";
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

//! Add House
const AddHouseController = async (req, res) => {
  const house = await req.body;
  await HouseModel.create(house);
  res.send({ success: true });
};

//! Get All Houses
const GetAllHouses = async (req, res) => {
  const email = req.query.email;
  const houses = await HouseModel.find({ owner: email });
  res.send(houses);
};

//! Get Filtered Houses
const GetFilteredHouses = async (req, res) => {
  const query = {};
  const title = req.query.title;
  const city = req.query.city;
  const bedroom = req.query.bedroom;
  const bathroom = req.query.bathroom;
  const size = req.query.size;
  if (title) {
    const titleRegEx = new RegExp(title, "i");
    query.name = titleRegEx;
  }
  if (city) {
    const cityRegEx = new RegExp(city, "i");
    query.city = cityRegEx;
  }
  if (bedroom) {
    // const cityRegEx = new RegExp(city, "i");
    query.bedroom = parseInt(bedroom);
  }
  if (bathroom) {
    // const cityRegEx = new RegExp(city, "i");
    query.bathroom = parseInt(bathroom);
  }

  // console.log("==>", title, city, bedroom, bathroom, size);
  const houses = await HouseModel.find(query);
  res.send(houses);
};

export {
  AddHouseController,
  AddUserController,
  FindUserController,
  GetAllHouses,
  GetFilteredHouses,
  IndexController,
  LogInUserController,
  LogOutUserController,
};
