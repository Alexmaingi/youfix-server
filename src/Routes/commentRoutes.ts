import { Router } from "express";
import {
  addComment,
  getCommentsToAnswer,
} from "../Controllers/commentController";

const commentsRoutes = Router();
commentsRoutes.post("/:answerId/:userId", addComment);
commentsRoutes.get("/:answerId", getCommentsToAnswer);

export default commentsRoutes;
