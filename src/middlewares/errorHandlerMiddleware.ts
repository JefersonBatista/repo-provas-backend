import { NextFunction, Request, Response } from "express";

import { AppErrorType } from "../utils/errorUtils.js";

interface Error {
  type?: AppErrorType;
  message?: string;
}

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if ("type" in error) {
    const { type, message } = error;

    switch (type) {
      case "unauthorized":
        return res.status(401).send(message);
      case "forbidden":
        return res.status(403).send(message);
      case "not_found":
        return res.status(404).send(message);
      case "conflict":
        return res.status(409).send(message);
      case "unprocessable_entity":
        return res.status(422).send(message);
    }
  }

  console.error(error);
  res.sendStatus(500);
}
