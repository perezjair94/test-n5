import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;

    if (data.email !== "testn5@mail.com" || data.password !== "testn5")
      return res.status(500).json({ success: false });

    const payload = { userId: 123 };
    const secretKey = process.env.SECRET_KEY || "";
    const token = jwt.sign(payload, secretKey);

    res.status(200).json({ token, success: true });
  } else {
    res.status(405).end();
  }
}
