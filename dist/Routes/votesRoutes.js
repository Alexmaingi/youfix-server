"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = require("./../Middleware/verifyToken");
const express_1 = require("express");
const voteControler_1 = require("../Controllers/voteControler");
const votesRoutes = (0, express_1.Router)();
votesRoutes.post("/upvote/:answerId/:userId", verifyToken_1.verifyToken, voteControler_1.upvote);
votesRoutes.post("/downvote/:answerId/:userId", verifyToken_1.verifyToken, voteControler_1.downvote);
exports.default = votesRoutes;
