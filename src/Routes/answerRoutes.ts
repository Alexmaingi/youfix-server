import { verifyToken } from "./../Middleware/verifyToken";
import { Router } from "express";
import {
  addAnswer,
  getAnswersToQuestion,
  markAsAccepted,
} from "../Controllers/answerController";

const answersRoutes = Router();

answersRoutes.post("/:questionId/:userId", verifyToken, addAnswer);
answersRoutes.get("/:questionId", verifyToken, getAnswersToQuestion);
answersRoutes.post("/answer/accepted/:id", verifyToken, markAsAccepted);

export default answersRoutes;
