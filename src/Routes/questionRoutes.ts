import { verifyToken } from "./../Middleware/verifyToken";
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

questionsRoutes.post("/:userId", verifyToken, addQuestion);
questionsRoutes.get("", verifyToken, getAllQuestions);
questionsRoutes.get("/:userId", verifyToken, getAllQuestionsByUser);
questionsRoutes.get("/question/:id", verifyToken, getOneQuestion);
questionsRoutes.put("/update/:id/:userId", verifyToken, updateQuestion);

questionsRoutes.delete("/delete/:id", verifyToken, deleteQuestion);

export default questionsRoutes;
