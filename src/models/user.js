const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email inválido");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('A senha não pode ser "password"');
        }
      },
    },
    height: {
      type: Number,
      trim: true,
      default: 0,
    },
    weight: {
      type: Number,
      trim: true,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Generate auth token JWT / user._id is an object, we need to use toString() because it's the parameter for jwt
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWTPASSKEY);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Static method generated to login, it finds the user by unique id, verify the hashed password e return the user.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// virtual reference between two collections mongoose

userSchema.virtual("exercise", {
  ref: "Exercise",
  localField: "_id",
  foreignField: "owner",
});

// hash password before saving "save", everytime the password is modified, it hashes again.
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
