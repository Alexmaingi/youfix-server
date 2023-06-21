import { Router } from "express";
import { downvote, upvote } from "../Controllers/voteControler";

const votesRoutes = Router();
votesRoutes.post("/upvote/:answerId/:userId", upvote);
votesRoutes.post("/downvote/:answerId/:userId", downvote);
export default votesRoutes;
