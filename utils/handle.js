import User from "../models/User";
import logger from "./logger";

export function notFoundError(id) {
  return createError(`Error: Not found: ${id}`, 404);
}

export function createError(message, statusCode, detail) {
  const err = new Error(message);
  err.statusCode = statusCode;
  if (detail) {
    err.detail = detail;
  }
  return err;
}

export function handleRequest(fn) {
  return async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      logger.warn("handleRequest error", error);
      if (error.statusCode) {
        return res
          .status(error.statusCode)
          .json({ error: error.message, detail: error.detail });
      }
      logger.error(`Unhandled error`, error);
      return res.status(500).json({ error: "Server Error" });
    }
  };
}

export async function validateUser(firebaseId, userId) {
  let user = (
    await User.findAll({
      where: {
        id: userId,
      },
      raw: true,
    })
  )[0];

  if (!user) {
    // User not available.
    return notFoundError(userId);
  }
  if (user.firebaseUID !== firebaseId) {
    // If trying to update some other persons profile, do not allow
    return createError("Forbidden", 403);
  }

  return { statusCode: 200 };
}

export async function getMyInfo(firebaseUID) {
  let user = (
    await User.findAll({
      where: {
        firebaseUID: firebaseUID,
        active: true,
      },
    })
  )[0];
  return user;
}

export async function commonCatch(error) {
  logger.error(error);
  if (error.name === "SequelizeValidationError" && error.errors) {
    return res.status(400).json({
      errors: error.errors.map((_error) => ({
        field: _error.path,
        type: _error.type,
        message: _error.message,
      })),
    });
  }
  return res
    .status(500)
    .json({
      message: "Unexpected error occured. Please try again or contact support.",
      error: true,
    });
}

export async function emailValidator(email) {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?).*$/;
  return emailRegexp.test(email);
}

export const getAuthTokenFromReq = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else {
    return null;
  }
};
