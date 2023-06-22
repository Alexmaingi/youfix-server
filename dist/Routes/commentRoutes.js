"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../Controllers/commentController");
const verifyToken_1 = require("../Middleware/verifyToken");
const commentsRoutes = (0, express_1.Router)();
commentsRoutes.post("/:answerId/:userId", verifyToken_1.verifyToken, commentController_1.addComment);
commentsRoutes.get("/:answerId", verifyToken_1.verifyToken, commentController_1.getCommentsToAnswer);
exports.default = commentsRoutes;
