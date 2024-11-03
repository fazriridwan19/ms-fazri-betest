import jwt from "jsonwebtoken";
import { logger } from "../app/logging.js";

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) {
//     logger.error("Token is not found");
//     res.status(401).json({
//       code: 401,
//       errors: "Unauthorized",
//       message: "Token required",
//     });
//   } else {
//     jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
//       logger.info("extract user from token");
//       if (err) {
//         logger.error("Token is not valid");
//         res.status(401).json({
//           code: 403,
//           errors: "Forbidden",
//           message: "Token is not valid",
//         });
//       } else {
//         try {
//           req.user = await userService.findByUsername(payload.sub);
//           next();
//         } catch (error) {
//           logger.error(error.message);
//           res.status(401).json({
//             code: 403,
//             errors: "Forbidden",
//             message: "Token is not valid",
//           });
//         }
//       }
//     });
//   }
// };

class AuthMiddleware {
  constructor(userService) {
    this.userService = userService;
    this.authenticate = this.authenticate.bind(this);
  }

  async authenticate(req, res, next) {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      logger.error("Token is not found");
      res.status(401).json({
        code: 401,
        errors: "Unauthorized",
        message: "Token required",
      });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
        logger.info("extract user from token");
        if (err) {
          logger.error("Token is not valid");
          res.status(401).json({
            code: 403,
            errors: "Forbidden",
            message: "Token is not valid",
          });
        } else {
          try {
            req.user = await this.userService.findByUsername(payload.sub);
            next();
          } catch (error) {
            logger.error(error.message);
            res.status(401).json({
              code: 403,
              errors: "Forbidden",
              message: "Token is not valid",
            });
          }
        }
      });
    }
  }
}

export default AuthMiddleware;
