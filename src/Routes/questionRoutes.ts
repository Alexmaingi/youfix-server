import { Router } from "express";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestions,
  getAllQuestionsByUser,
  getOneQuestion,
  updateQuestion,
} from "../Controllers/questionController";
const questionsRoutes = Router();

questionsRoutes.post("/:userId", addQuestion);
questionsRoutes.get("", getAllQuestions);
questionsRoutes.get("/:userId", getAllQuestionsByUser);
questionsRoutes.get("/question/:id", getOneQuestion);
questionsRoutes.put("/update/:id/:userId", updateQuestion);

questionsRoutes.delete("/delete/:id", deleteQuestion);

export default questionsRoutes;
