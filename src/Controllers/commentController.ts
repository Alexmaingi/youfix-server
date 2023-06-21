import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { Comment } from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// inserting comment

export const addComment = async (
  req: Request<{ answerId: string; userId: string }>,
  res: Response
) => {
  try {
    let id = uuid();
    const { body } = req.body;
    const { answerId, userId } = req.params;
    await DatabaseHelper.exec("addComment", { id, answerId, userId, body });
    return res.status(201).json({ message: "Comment submitted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

//get all Comments to an answer

export const getCommentsToAnswer = async (
  req: Request<{ answerId: string }>,
  res: Response
) => {
  try {
    const { answerId } = req.params;
    let comments: Comment[] = (
      await DatabaseHelper.exec("getCommentsByAnswerId", { answerId })
    ).recordset;
    return res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
