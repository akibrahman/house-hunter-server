//! Root Controller
const IndexController = async (req, res) => {
  res.send("House Hunter Server is Running");
};

//! Addin new User To DB
const AddUserController = async (req, res) => {
  console.log("=>", await req.body);
};

export { AddUserController, IndexController };
