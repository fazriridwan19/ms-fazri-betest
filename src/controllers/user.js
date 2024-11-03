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
