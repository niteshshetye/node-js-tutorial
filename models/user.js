const { Schema, default: mongoose } = require("mongoose");

const EMAIL_REG_EX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const USER_SCHEMA = "User";

const addressSchema = new Schema({
  pincode: { type: Number, required: [true, "Pincode is required"] },
  street: { type: String, required: [true, "Street is required"] },
  phone: {
    type: String,
    max: [10, "Phone should less than 11"],
    min: [10, "Phone should grater than 9"],
  },
});

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    max: [16, "First name length should less than 16 char"],
    min: [2, "First name length should grater than 2 char"],
  },
  lastname: {
    type: String,
    max: [16, "Last name length should less than 16 char"],
  },
  age: {
    type: Number,
    max: [100, "Age should less than 100"],
    min: [12, "Age should grater than 2"],
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return EMAIL_REG_EX.test(v);
      },
      message: (props) => `${props.value} is not valid Email`,
    },
    required: [true, "Email is required"],
    unique: [true, "Email already exist"],
  },
  address: addressSchema,
});

const User = mongoose.model(USER_SCHEMA, userSchema);

exports.User = User;
