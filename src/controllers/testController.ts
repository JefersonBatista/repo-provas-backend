import { Request, Response } from "express";

function get(req: Request, res: Response) {
  res.send(res.locals);
}

export default { get };
