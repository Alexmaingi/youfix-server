import express, { json } from "express";
import userRoutes from "./Routes/userRoutes";
import questionsRoutes from "./Routes/questionRoutes";
import answersRoutes from "./Routes/answerRoutes";
import commentsRoutes from "./Routes/commentRoutes";
import votesRoutes from "./Routes/votesRoutes";

export const app = express();
app.use(json());
app.use("/users", userRoutes);
app.use("/questions", questionsRoutes);
app.use("/answers", answersRoutes);
app.use("/comments", commentsRoutes);
app.use("/votes", votesRoutes);

app.listen(5000, () => {
  console.log("Server Running...");
});
