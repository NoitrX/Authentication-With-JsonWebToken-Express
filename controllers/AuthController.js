
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user,statusCode, res) => {
  const token = signToken(user.id)
  const cookieOption = {
    expire : new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly : true
  }
  res.cookie("jwt", token, cookieOption)

  user.password = undefined
  res.status(statusCode).json( {
    status : "Success",
    token,
    data : user
  })
}

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

   createSendToken(newUser, 201, res)
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
  createSendToken(userData, 200, res)
};
