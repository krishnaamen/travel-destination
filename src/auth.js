import passport from "passport";
import { User } from "./models.js";
import { Strategy } from "passport-jwt";
import jwt from "jsonwebtoken";

const SECRET = "remove_me_from_vcs";

function setupAuth(app) {
  const jwtOptions = {
    jwtFromRequest: (req) => {
      console.log(req.cookies);
      return req.cookies["auth_token"] ?? null;
    },
    secretOrKey: SECRET,
  };
  const strategy = new Strategy(jwtOptions, async function (payload, next) {
    const user = await User.findOne({ _id: payload._id });
    console.log("user found", user);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });

  passport.use(strategy);
  app.use(passport.initialize());

  app.post("/auth/register", async (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // Never save passwords as clear text.
    const insertedUser = await user.save();
    delete insertedUser.password;

    const generatedToken = jwt.sign({ _id: insertedUser._id }, SECRET);
    res.cookie("auth_token", generatedToken, { httpOnly: true });

    res.status(201).json(insertedUser); // Remove encoded password before sending it back.
  });

  app.post("/auth/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (await user.isValidPassword(req.body.password)) {
        console.log("password is valid");
        const generatedToken = jwt.sign({ _id: user._id }, SECRET);
        res.cookie("auth_token", generatedToken, { httpOnly: true });
        console.log("signed token");
        res.status(200).json({ token: generatedToken });
        return;
      }
      res.status(401).json({ message: "Invalid login" }); // email match, but password does not!
      return;
    } catch (e) {
      console.error(e);
      res.status(401).json({ message: "Invalid login" }); // email does not match.
    }
  });
}

export { setupAuth };
