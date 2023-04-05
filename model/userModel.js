const { model, Schema } = require("mongoose");
const user = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    gender: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("user", user);
