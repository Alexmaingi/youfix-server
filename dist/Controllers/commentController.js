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
exports.getCommentsToAnswer = exports.addComment = void 0;
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const DatabaseHelper_1 = require("../DatabaseHelper");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
// inserting comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        const { body } = req.body;
        const { answerId, userId } = req.params;
        yield DatabaseHelper_1.DatabaseHelper.exec("addComment", { id, answerId, userId, body });
        return res.status(201).json({ message: "Comment submitted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.addComment = addComment;
//get all Comments to an answer
const getCommentsToAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answerId } = req.params;
        let comments = (yield DatabaseHelper_1.DatabaseHelper.exec("getCommentsByAnswerId", { answerId })).recordset;
        return res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getCommentsToAnswer = getCommentsToAnswer;
