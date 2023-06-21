import { Router } from "express";
import {
  addAnswer,
  getAnswersToQuestion,
  markAsAccepted,
} from "../Controllers/answerController";

const answersRoutes = Router();

answersRoutes.post("/:questionId/:userId", addAnswer);
answersRoutes.get("/:questionId", getAnswersToQuestion);
answersRoutes.post("/answer/accepted/:id", markAsAccepted);

export default answersRoutes;
