import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { Answer, Questions } from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// inserting answer

export const addAnswer = async (
  req: Request<{ questionId: string; userId: string }>,
  res: Response
) => {
  try {
    let id = uuid();
    const { body } = req.body;
    const { questionId, userId } = req.params;

    let question: Questions = (
      await DatabaseHelper.exec("getOneQuestion", { id: questionId })
    ).recordset[0];

    if (question) {
      await DatabaseHelper.exec("addAnswer", { id, questionId, userId, body });
      return res.status(201).json({ message: "answer submitted" });
    } else {
      return res.status(404).json({ message: "Question Not Found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

//get all answers to a question

// export const getAnswersToQuestion = async (
//   req: Request<{ questionId: string }>,
//   res: Response
// ) => {
//   try {
//     const { questionId } = req.params;
//     let answers: Answer[] = (
//       await DatabaseHelper.exec("getAnswersByQID", { questionId })
//     ).recordset;
//     return res.status(200).json(answers);
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const getAnswersToQuestion = async (
  req: Request<{ questionId: string }>,
  res: Response
) => {
  try {
    const { questionId } = req.params;
    let answers: Answer[] = (
      await DatabaseHelper.exec("getAnswersByQID", { questionId })
    ).recordset;
    return res.status(200).json(answers);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

//mark answer as accept

export const markAsAccepted = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    // const {questionId}=  req.body
    // await DatabaseHelper.exec('removePreffered',{qid});
    await DatabaseHelper.exec("markAsAccepted", { id });
    return res.status(200).json({ message: "marked as accepted" });
  } catch (error: any) {
    return res.status(500).json({ message: "hello mf" });
  }
};
