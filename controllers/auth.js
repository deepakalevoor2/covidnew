const User = require("../models/user");
const Hospital = require("../models/hospital");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { displayName, email, password } = req.body;
  const name = displayName;
  const userReq = { name, email, password };
  const user = new User(userReq);
  console.log("req body is", req.body);
  console.log("user is", userReq);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ $or: [{ email: email }, { name: email }] }).exec(
    (err, user) => {
      let hospUser = false;
      let hospital = new Hospital();
      if (err) {
        return res.status(400).json({ error: "User email does not exist" });
      }

      if (!user.authenticate(password)) {
        return res
          .status(401)
          .json({ error: "Email and password do not match" });
      }

      //Create a token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      //Put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      Hospital.findOne({ hospitalCode: email })
        //.exec()
        .exec((err, hospitalObj) => {
          if (!err) {
            if (hospitalObj) {
              hospUser = true;
              hospital = hospitalObj;
              console.log("in exec", hospUser);
              console.log(hospitalObj);
            }
          }

          //Send response to frontend
          console.log(hospUser);

          if (!hospUser) {
            const { _id, name, email, role } = user;
            return res.json({ token, user: { _id, name, email, role } });
          } else {
            const {
              hospitalCode,
              name,
              location,
              beds,
              ventilators,
              address,
              insurance,
            } = hospital;
            return res.json({
              hospital: {
                token,
                hospitalCode,
                name,
                location,
                beds,
                ventilators,
                address,
                insurance,
              },
            });
          }
        });
    }
  );
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User signout" });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "Requires Admin access" });
  }
  next();
};
