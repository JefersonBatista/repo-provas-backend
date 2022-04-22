import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { invalidAuthTokenError } from "../utils/errorUtils.js";

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer ")) {
    throw invalidAuthTokenError();
  }

  const token = authorization?.replace("Bearer ", "");

  const jwtSecret = process.env.JWT_SECRET;
  try {
    const { userId } = jwt.verify(token, jwtSecret) as { userId: number };

    res.locals.userId = userId;
  } catch (_) {
    throw invalidAuthTokenError();
  }

  next();
}
