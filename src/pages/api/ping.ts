import { NextApiRequest, NextApiResponse } from "next"

export default function ApiPing(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ message: "pong" })
}
