"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = require("./../Middleware/verifyToken");
const express_1 = require("express");
const questionController_1 = require("../Controllers/questionController");
const questionsRoutes = (0, express_1.Router)();
questionsRoutes.post("/:userId", verifyToken_1.verifyToken, questionController_1.addQuestion);
questionsRoutes.get("", verifyToken_1.verifyToken, questionController_1.getAllQuestions);
questionsRoutes.get("/:userId", verifyToken_1.verifyToken, questionController_1.getAllQuestionsByUser);
questionsRoutes.get("/question/:id", verifyToken_1.verifyToken, questionController_1.getOneQuestion);
questionsRoutes.put("/update/:id/:userId", verifyToken_1.verifyToken, questionController_1.updateQuestion);
questionsRoutes.delete("/delete/:id", verifyToken_1.verifyToken, questionController_1.deleteQuestion);
exports.default = questionsRoutes;
