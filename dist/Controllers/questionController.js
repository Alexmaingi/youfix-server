"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestion = exports.deleteQuestion = exports.getOneQuestion = exports.getAllQuestionsByUser = exports.getAllQuestions = exports.addQuestion = void 0;
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const DatabaseHelper_1 = require("../DatabaseHelper");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
// add a question
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        const { title, body, tags } = req.body;
        const { userId } = req.params; //look into the possibility of confirming this with the token
        yield DatabaseHelper_1.DatabaseHelper.exec("addQuestion", { id, userId, title, body });
        tags.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
            let tag_id = (0, uuid_1.v4)();
            yield DatabaseHelper_1.DatabaseHelper.exec("addTags", {
                id: tag_id,
                tagname: tag.tagname,
            });
            yield DatabaseHelper_1.DatabaseHelper.exec("addQuestionTags", {
                id: tag_id,
                questionId: id,
            });
        }));
        return res.status(201).json({ message: "question submitted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.addQuestion = addQuestion;
// get all questions
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = req.query.pageNumber
            ? parseInt(req.query.pageNumber)
            : 1;
        const pageSize = req.query.pageSize
            ? parseInt(req.query.pageSize)
            : 10;
        const params = {
            pageNumber: pageNumber,
            pageSize: pageSize,
        };
        const questions = (yield DatabaseHelper_1.DatabaseHelper.exec("getAllQuestions", params)).recordset;
        return res.status(200).json(questions);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllQuestions = getAllQuestions;
// get all question byt user id
const getAllQuestionsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        let questions = (yield DatabaseHelper_1.DatabaseHelper.exec("getQuestionsByUserId", { userId })).recordset;
        return res.status(200).json(questions);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllQuestionsByUser = getAllQuestionsByUser;
// get one question
const getOneQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let question = (yield DatabaseHelper_1.DatabaseHelper.exec("getOneQuestion", { id })).recordset[0];
        if (question) {
            return res.status(200).json(question);
        }
        else {
            return res.status(404).json({ message: "Question Not Found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getOneQuestion = getOneQuestion;
// Delete a question
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const userId_ = (_a = req.info) === null || _a === void 0 ? void 0 : _a.id;
        const role = (_b = req.info) === null || _b === void 0 ? void 0 : _b.role;
        let question = (yield DatabaseHelper_1.DatabaseHelper.exec("getOneQuestion", { id })).recordset[0];
        if (!question) {
            return res.status(404).json({ message: "Question Not Found" });
        }
        else {
            if (question.userId === userId_ || role === "admin") {
                yield DatabaseHelper_1.DatabaseHelper.exec("deleteQuestion", { id });
                return res.status(200).json({ message: "Deleted successfully" });
            }
            else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteQuestion = deleteQuestion;
// Update a question
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, tags } = req.body;
        const { id, userId } = req.params; //qid
        yield DatabaseHelper_1.DatabaseHelper.exec("updateQuestion", { id, userId, title, body });
        tags.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
            // await DatabaseHelper.exec("updateQuestionTags", { tid: tag.id, id });
            let tag_id = (0, uuid_1.v4)();
            // await DatabaseHelper.exec("updateTag", {
            //   id: tag_id,
            //   tagname: tag.tagname,
            // });
            yield DatabaseHelper_1.DatabaseHelper.exec("updateQuestionTags", {
                id: tag_id,
                questionId: id,
                tagname: tag.tagname,
            });
        }));
        return res.status(201).json({ message: "question updated" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateQuestion = updateQuestion;
