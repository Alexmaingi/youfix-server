import { Request, RequestHandler, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { ExtendedRequest, Questions, User } from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// add a question

export const addQuestion = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    let id = uuid();
    const { title, body, tags } = req.body;
    const { userId } = req.params; //look into the possibility of confirming this with the token
    await DatabaseHelper.exec("addQuestion", { id, userId, title, body });
    tags.forEach(async (tag: { tagname: string; id: string }) => {
      let tag_id = uuid();
      await DatabaseHelper.exec("addTags", {
        id: tag_id,
        tagname: tag.tagname,
      });
      await DatabaseHelper.exec("addQuestionTags", {
        id: tag_id,
        questionId: id,
      });
    });
    return res.status(201).json({ message: "question submitted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// get all questions

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber as string)
      : 1;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 10;

    const params = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };

    const questions: Questions[] = (
      await DatabaseHelper.exec("getAllQuestions", params)
    ).recordset;

    return res.status(200).json(questions);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
// get all question byt user id

export const getAllQuestionsByUser = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    let questions: Questions[] = (
      await DatabaseHelper.exec("getQuestionsByUserId", { userId })
    ).recordset;
    return res.status(200).json(questions);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// get one question

export const getOneQuestion = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    let question: Questions = (
      await DatabaseHelper.exec("getOneQuestion", { id })
    ).recordset[0];
    if (question) {
      return res.status(200).json(question);
    } else {
      return res.status(404).json({ message: "Question Not Found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a question

export const deleteQuestion = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId_ = req.info?.id as string;
    const role = req.info?.role as string;
    let question: Questions = (
      await DatabaseHelper.exec("getOneQuestion", { id })
    ).recordset[0];
    if (!question) {
      return res.status(404).json({ message: "Question Not Found" });
    } else {
      if (question.userId === userId_ || role === "admin") {
        await DatabaseHelper.exec("deleteQuestion", { id });
        return res.status(200).json({ message: "Deleted successfully" });
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a question

export const updateQuestion = async (
  req: Request<{ id: string; userId: string }>,
  res: Response
) => {
  try {
    const { title, body, tags } = req.body;
    const { id, userId } = req.params; //qid

    await DatabaseHelper.exec("updateQuestion", { id, userId, title, body });
    tags.forEach(async (tag: { id: string; tagname: string }) => {
      // await DatabaseHelper.exec("updateQuestionTags", { tid: tag.id, id });
      let tag_id = uuid();
      // await DatabaseHelper.exec("updateTag", {
      //   id: tag_id,
      //   tagname: tag.tagname,
      // });
      await DatabaseHelper.exec("updateQuestionTags", {
        id: tag_id,
        questionId: id,
        tagname: tag.tagname,
      });
    });
    return res.status(201).json({ message: "question updated" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
