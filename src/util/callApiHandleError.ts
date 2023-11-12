import { NextApiResponse } from "next";

export function callApiHandleError(error: unknown, res: NextApiResponse) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }