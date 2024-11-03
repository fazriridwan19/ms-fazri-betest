import { model, Schema } from "mongoose";

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "must provide name"],
//   },
//   identityNumber: {
//     type: String,
//     required: [true, "must provide identityNumber"],
//     unique: true,
//   },
//   accountNumber: {
//     type: String,
//     required: [true, "must provide accountNumber"],
//     unique: true,
//   },
//   emailAddress: {
//     type: String,
//     required: [true, "must provide email"],
//     unique: true,
//   },
//   username: {
//     type: String,
//     required: [true, "must provide username"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "must provide password"],
//   },
// });

// export const User = model("User", userSchema);

class UserModel {
  /**
   *
   */
  constructor() {
    this.userSchema = new Schema({
      name: {
        type: String,
        required: [true, "must provide name"],
      },
      identityNumber: {
        type: String,
        required: [true, "must provide identityNumber"],
        unique: true,
      },
      accountNumber: {
        type: String,
        required: [true, "must provide accountNumber"],
        unique: true,
      },
      emailAddress: {
        type: String,
        required: [true, "must provide email"],
        unique: true,
      },
      username: {
        type: String,
        required: [true, "must provide username"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "must provide password"],
      },
    });
    this.user = model("User", this.userSchema);
  }
}

export const userModel = new UserModel();
