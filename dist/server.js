"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const questionRoutes_1 = __importDefault(require("./Routes/questionRoutes"));
const answerRoutes_1 = __importDefault(require("./Routes/answerRoutes"));
const commentRoutes_1 = __importDefault(require("./Routes/commentRoutes"));
const votesRoutes_1 = __importDefault(require("./Routes/votesRoutes"));
exports.app = (0, express_1.default)();
exports.app.use((0, express_1.json)());
exports.app.use("/users", userRoutes_1.default);
exports.app.use("/questions", questionRoutes_1.default);
exports.app.use("/answers", answerRoutes_1.default);
exports.app.use("/comments", commentRoutes_1.default);
exports.app.use("/votes", votesRoutes_1.default);
exports.app.listen(5000, () => {
    console.log("Server Running...");
});
