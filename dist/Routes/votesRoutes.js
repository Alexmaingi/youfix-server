"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const voteControler_1 = require("../Controllers/voteControler");
const votesRoutes = (0, express_1.Router)();
votesRoutes.post("/upvote/:answerId/:userId", voteControler_1.upvote);
votesRoutes.post("/downvote/:answerId/:userId", voteControler_1.downvote);
exports.default = votesRoutes;
