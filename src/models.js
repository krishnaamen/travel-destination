import mongoose from "mongoose";
import bcrypt from "bcrypt";

const destinationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, "please enter country name"],
    },
    title: {
      type: String,
      required: [true, "please enter title"],
    },
    link: {
      type: String,
      required: false,
    },
    arrivalDate: {
      type: Date,
      required: false,
    },
    departureDate: {
      type: Date,
      required: false,
    },
    image: {
      type: Buffer,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Destination = mongoose.model("Destination", destinationSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  console.log(this.password, hash);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  console.log(password, this.password);
  const isValidPassword = await bcrypt.compare(password, this.password);
  console.log(isValidPassword);
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

export { Destination, User };
