import express from "express";
import router from "./routes.js";
import { Destination } from "./models.js";
import "./db.js";
import { ObjectId } from "mongodb";
import { setupAuth } from "./auth.js";
import passport from "passport";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "9999999999999999999999999" }));
app.use(express.static("./public"));
app.use(cookieParser());
setupAuth(app);

const authenticated = () =>
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login",
  });

// Mount the API routes
app.use("/api", authenticated(), router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", authenticated(), (_, res) => res.redirect("/destinations"));

app.get("/destinations/images/:id", authenticated(), async (req, res) => {
  const { id } = req.params;
  console.log(id);

  let destination = await Destination.findById(new ObjectId(id), { image: 1 });
  console.log("destination", destination);

  console.log("got", destination);
  if (destination === null) {
    res.sendStatus(404);
    return;
  }

  const bytes = destination.image;
  console.log("sending", bytes);
  res.send(bytes);
});
