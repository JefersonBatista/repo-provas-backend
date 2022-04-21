import { NextFunction, Request, Response } from "express";

interface Error {
  type?: string;
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
      case "conflict":
        return res.status(409).send(message);
    }
  }

  console.error(error);
  res.sendStatus(500);
}
