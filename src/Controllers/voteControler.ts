import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { DatabaseHelper } from "../DatabaseHelper";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// UPVOTE
export const upvote = async (
  req: Request<{ answerId: string; userId: string }>,
  res: Response
) => {
  try {
    let id = uuid();
    const { answerId, userId } = req.params;
    await DatabaseHelper.exec("upvote", { id, answerId, userId });
    return res.status(201).json({ message: "upvoted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// DOWNVOTE

export const downvote = async (
  req: Request<{ answerId: string; userId: string }>,
  res: Response
) => {
  try {
    let id = uuid();
    const { answerId, userId } = req.params;
    await DatabaseHelper.exec("downvote", { id, answerId, userId });
    return res.status(201).json({ message: "downvoted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
