import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../error/errorResponse.js";
import { loginUserValidation } from "../validations/userValidation.js";
import { validate } from "../validations/validation.js";
import { logger } from "../app/logging.js";

// const login = async (request) => {
//   request = validate(loginUserValidation, request);
//   const user = await userService.findByUsername(request.username);
//   const isPasswordValid = await bcrypt.compare(request.password, user.password);
//   if (!isPasswordValid) {
//     throw new ErrorResponse(401, "Username or password is not valid");
//   }
//   const token = jwt.sign(
//     {
//       sub: user.username,
//       name: user.name,
//     },
//     process.env.SECRET_KEY,
//     { expiresIn: "1h" }
//   );
//   return { token };
// };

// export default { login };

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async login(request) {
    request = validate(loginUserValidation, request);
    const user = await this.userModel
      .findOne(
        { username: request.username },
        "_id name identityNumber accountNumber emailAddress username password"
      )
      .exec();
    if (!user) {
      logger.error("User not found");
      throw new ErrorResponse(404, "User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ErrorResponse(401, "Username or password is not valid");
    }
    const token = jwt.sign(
      {
        sub: user.username,
        name: user.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return { token };
  }
}

export default AuthService;
