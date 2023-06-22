import { Router } from "express";
import {
  addComment,
  getCommentsToAnswer,
} from "../Controllers/commentController";
import { verifyToken } from "../Middleware/verifyToken";

const commentsRoutes = Router();
commentsRoutes.post("/:answerId/:userId", verifyToken, addComment);
commentsRoutes.get("/:answerId", verifyToken, getCommentsToAnswer);

export default commentsRoutes;
