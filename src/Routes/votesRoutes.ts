import { verifyToken } from "./../Middleware/verifyToken";
import { Router } from "express";
import { downvote, upvote } from "../Controllers/voteControler";

const votesRoutes = Router();
votesRoutes.post("/upvote/:answerId/:userId", verifyToken, upvote);
votesRoutes.post("/downvote/:answerId/:userId", verifyToken, downvote);
export default votesRoutes;
