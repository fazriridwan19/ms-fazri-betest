// import userService from "../services/user.js";
// import authService from "../services/auth.js";
// import { ApiResponse } from "../dto/response.js";
// import { logger } from "../app/logging.js";
// import { redisClient } from "../app/redisClient.js";

// const registration = async (req, res, next) => {
//   try {
//     const result = await userService.create(req.body);
//     res
//       .status(201)
//       .json(new ApiResponse(201, "User created successfully", result));
//   } catch (error) {
//     logger.error(error.message);
//     next(error);
//   }
// };

// const login = async (req, res, next) => {
//   try {
//     const result = await authService.login(req.body);
//     res
//       .status(200)
//       .json(new ApiResponse(200, "Successfully logged in", result));
//   } catch (error) {
//     logger.error(error.message);
//     next(error);
//   }
// };

// const findAll = async (req, res, next) => {
//   try {
//     const result = await userService.findAll();
//     await redisClient.set("data", JSON.stringify(result), {
//       EX: 60 * 5,
//     });
//     res
//       .status(200)
//       .json(new ApiResponse(200, "Successfully retrieve users", result));
//   } catch (error) {
//     logger.error(error.message);
//     next(error);
//   }
// };

// const findByIdentityNumber = async (req, res, next) => {
//   try {
//     const result = await userService.findByIdentityNumber(
//       req.params.identityNumber
//     );
//     await redisClient.set(req.params.identityNumber, JSON.stringify(result), {
//       EX: 60 * 5,
//     });
//     res
//       .status(200)
//       .json(new ApiResponse(200, "Successfully retrieve user", result));
//   } catch (error) {
//     logger.error(error.message);
//     next(error);
//   }
// };

// const findByAccountNumber = async (req, res, next) => {
//   try {
//     const result = await userService.findByAccountNumber(
//       req.params.accountNumber
//     );
//     await redisClient.set(req.params.accountNumber, JSON.stringify(result), {
//       EX: 60 * 5,
//     });
//     res
//       .status(200)
//       .json(new ApiResponse(200, "Successfully retrieve user", result));
//   } catch (error) {
//     logger.error(error.message);
//     next(error);
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     const identityNumber = req.user.identityNumber;
//     const request = req.body;
//     request.identityNumber = identityNumber;

//     const result = await userService.update(request);
//     res
//       .status(200)
//       .json(new ApiResponse(200, "Successfully update current user", result));
//   } catch (error) {
//     logger.error(error.message);
//     next(error);
//   }
// };

// const remove = async (req, res, next) => {
//   try {
//     const identityNumber = req.user.identityNumber;
//     await userService.remove(identityNumber);
//     res
//       .status(200)
//       .json(new ApiResponse(200, "Successfully delete user", null));
//   } catch (error) {
//     logger.error(error.message);
//     next(error);
//   }
// };

// export default {
//   registration,
//   login,
//   findAll,
//   findByIdentityNumber,
//   findByAccountNumber,
//   update,
//   remove,
// };

import { ApiResponse } from "../dto/response.js";
import { logger } from "../app/logging.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
    this.registration = this.registration.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findByIdentityNumber = this.findByIdentityNumber.bind(this);
    this.findByAccountNumber = this.findByAccountNumber.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async registration(req, res, next) {
    try {
      const result = await this.userService.create(req.body);
      res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", result));
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const result = await this.userService.findAll();
      res
        .status(200)
        .json(new ApiResponse(200, "Successfully retrieved users", result));
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  }

  async findByIdentityNumber(req, res, next) {
    try {
      const result = await this.userService.findByIdentityNumber(
        req.params.identityNumber
      );
      res
        .status(200)
        .json(new ApiResponse(200, "Successfully retrieved user", result));
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  }

  async findByAccountNumber(req, res, next) {
    try {
      const result = await this.userService.findByAccountNumber(
        req.params.accountNumber
      );
      res
        .status(200)
        .json(new ApiResponse(200, "Successfully retrieved user", result));
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const identityNumber = req.user.identityNumber;
      const request = { ...req.body, identityNumber };
      const result = await this.userService.update(request);
      res
        .status(200)
        .json(
          new ApiResponse(200, "Successfully updated current user", result)
        );
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const identityNumber = req.user.identityNumber;
      await this.userService.remove(identityNumber);
      res
        .status(200)
        .json(new ApiResponse(200, "Successfully deleted user", null));
    } catch (error) {
      logger.error(error.message);
      next(error);
    }
  }
}

// Export the instance methods
export default UserController;
