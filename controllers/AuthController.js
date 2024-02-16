const { User } = require("../models");
const jwt = require("jsonwebtoken");
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.registerUser = async (req, res) => {
  try {
    if (req.body.password != req.body.passwordConfirm) {
      return res.status(400).json({
        message: "Password Tidak Sama!",
      });
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(newUser.id);

    return res.status(201).json({
      message: "Register Berhasil",
      token,
      data: newUser,
    });
  } catch (error) {
    console.log(error, 'i');
    return res.status(400).json({
      message: "Validasi Error",
      error: error.errors.message
    });
  }
};

exports.loginUser = async (req, res) => {
  // Fungsi Validasi
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: " Fail",
      message: "Validation Error",
      error: "Please fill Email And Password!",
    });
  }

  const userData = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Error Login",
      error: "Invalid Email or Password",
    });
  }

  //token Res login
  const token = signToken(userData.id);

  return res.status(200).json({
    status: "success",
    message: "Login Successfully",
    token,
  });
};
