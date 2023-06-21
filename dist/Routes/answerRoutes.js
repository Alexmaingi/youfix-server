"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answerController_1 = require("../Controllers/answerController");
const answersRoutes = (0, express_1.Router)();
answersRoutes.post("/:questionId/:userId", answerController_1.addAnswer);
answersRoutes.get("/:questionId", answerController_1.getAnswersToQuestion);
answersRoutes.post("/answer/accepted/:id", answerController_1.markAsAccepted);
exports.default = answersRoutes;
