import { logger } from "../app/logging.js";
import { ApiResponse } from "../dto/response.js";

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res, next) {
    try {
      const result = await this.authService.login(req.body);
      res
        .status(200)
        .json(new ApiResponse(200, "Successfully logged in", result));
    } catch (error) {
      logger.error(error.message + " - auth controller");
      next(error);
    }
  }
}

export default AuthController;
