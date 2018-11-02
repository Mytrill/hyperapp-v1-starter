import { Request, Response } from "express"

export interface Route {
  path: string
  handler(req: Request, res: Response): any
}
