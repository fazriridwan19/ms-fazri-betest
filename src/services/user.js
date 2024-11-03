import { logger } from "../app/logging.js";
import { ErrorResponse } from "../error/errorResponse.js";
import bcrypt from "bcrypt";
import {
  accountNumberValidation,
  createUserValidation,
  identityNumberValidation,
  updateUserValidation,
  usernameValidation,
} from "../validations/userValidation.js";
import { validate } from "../validations/validation.js";
import { redisClient } from "../app/redisClient.js";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async cacheUserData(key, data, expiration = 600) {
    try {
      await redisClient.set(key, JSON.stringify(data), { EX: expiration });
    } catch (error) {
      logger.warn(`Redis error while setting cache for key ${key}:`, error);
    }
  }

  async clearUserCache(user) {
    const keys = [
      `user:${user.identityNumber}`,
      `user:${user.accountNumber}`,
      `user:${user.username}`,
      `user:data`,
    ];
    try {
      await Promise.all(keys.map((key) => redisClient.del(key)));
    } catch (error) {
      logger.error("Redis error while clearing user cache:", error);
    }
  }

  async clearSingleUserCache(key) {
    try {
      await redisClient.del(`user:${key}`);
    } catch (error) {
      logger.error(`Redis error while clearing user cache - ${key}:`, error);
    }
  }

  async create(request) {
    const user = validate(createUserValidation, request);

    const duplicate = await this.userModel.findOne({
      $or: [
        { identityNumber: user.identityNumber },
        { accountNumber: user.accountNumber },
        { emailAddress: user.emailAddress },
        { username: user.username },
      ],
    });

    if (duplicate) {
      const duplicateFields = [];
      if (duplicate.identityNumber === user.identityNumber)
        duplicateFields.push("identityNumber");
      if (duplicate.accountNumber === user.accountNumber)
        duplicateFields.push("accountNumber");
      if (duplicate.emailAddress === user.emailAddress)
        duplicateFields.push("emailAddress");
      if (duplicate.username === user.username)
        duplicateFields.push("username");

      logger.error(`Duplicate fields: ${duplicateFields.join(", ")}`);
      throw new ErrorResponse(
        400,
        `Duplicate fields: ${duplicateFields.join(", ")}`
      );
    }

    user.password = await bcrypt.hash(user.password, 10);
    const savedUser = await this.userModel.create(user);

    await this.clearSingleUserCache("data");

    return {
      _id: savedUser._id,
      name: savedUser.name,
      identityNumber: savedUser.identityNumber,
      accountNumber: savedUser.accountNumber,
      emailAddress: savedUser.emailAddress,
      username: savedUser.username,
    };
  }

  async findByIdentityNumber(identityNumber) {
    identityNumber = validate(identityNumberValidation, identityNumber);

    try {
      const cachedData = await redisClient.get(`user:${identityNumber}`);
      if (cachedData) return JSON.parse(cachedData);
    } catch (error) {
      logger.warn(
        "Redis error while fetching user cache for identityNumber:",
        error
      );
    }

    logger.info(`Cache miss for identityNumber: ${identityNumber}`);
    const user = await this.userModel
      .findOne(
        { identityNumber },
        "_id name identityNumber accountNumber emailAddress username"
      )
      .exec();

    if (!user) {
      logger.error("User not found");
      throw new ErrorResponse(404, "User not found");
    }

    await this.cacheUserData(`user:${identityNumber}`, user);
    return user;
  }

  async findByAccountNumber(accountNumber) {
    accountNumber = validate(accountNumberValidation, accountNumber);

    try {
      const cachedData = await redisClient.get(`user:${accountNumber}`);
      if (cachedData) return JSON.parse(cachedData);
    } catch (error) {
      logger.warn(
        "Redis error while fetching user cache for accountNumber:",
        error
      );
    }

    logger.info(`Cache miss for accountNumber: ${accountNumber}`);
    const user = await this.userModel
      .findOne(
        { accountNumber },
        "_id name identityNumber accountNumber emailAddress username"
      )
      .exec();

    if (!user) {
      logger.error("User not found");
      throw new ErrorResponse(404, "User not found");
    }

    await this.cacheUserData(`user:${accountNumber}`, user);
    return user;
  }

  async findByUsername(username) {
    username = validate(usernameValidation, username);

    try {
      const cachedData = await redisClient.get(`user:${username}`);
      if (cachedData) return JSON.parse(cachedData);
    } catch (error) {
      logger.warn("Redis error while fetching user cache for username:", error);
    }

    logger.info(`Cache miss for username: ${username}`);
    const user = await this.userModel
      .findOne(
        { username },
        "_id name identityNumber accountNumber emailAddress username"
      )
      .exec();

    if (!user) {
      logger.error("User not found");
      throw new ErrorResponse(404, "User not found");
    }

    await this.cacheUserData(`user:${username}`, user);
    return user;
  }

  async findAll() {
    try {
      const cachedData = await redisClient.get("user:data");
      if (cachedData) return JSON.parse(cachedData);
    } catch (error) {
      logger.warn("Redis error while fetching all users cache:", error);
    }

    logger.info("Cache miss for all users");
    const users = await this.userModel.find(
      {},
      "_id name identityNumber accountNumber"
    );

    await this.cacheUserData("user:data", users);
    return users;
  }

  async update(request) {
    request = validate(updateUserValidation, request);
    const user = await this.findByIdentityNumber(request.identityNumber);

    const updatedFields = {};
    if (request.name) updatedFields.name = request.name;
    if (request.emailAddress) updatedFields.emailAddress = request.emailAddress;
    if (request.password)
      updatedFields.password = await bcrypt.hash(request.password, 10);

    await this.userModel.updateOne(
      { identityNumber: user.identityNumber },
      { $set: updatedFields }
    );

    const updatedUser = { ...user, ...updatedFields };
    await this.clearUserCache(user);
    await this.cacheUserData(`user:${user.identityNumber}`, updatedUser);

    return { identityNumber: user.identityNumber };
  }

  async remove(identityNumber) {
    identityNumber = validate(identityNumberValidation, identityNumber);
    const user = await this.findByIdentityNumber(identityNumber);
    await this.userModel.deleteOne({ _id: user._id });
    await this.clearUserCache(user);
    return { message: "User deleted successfully" };
  }
}

export default UserService;
