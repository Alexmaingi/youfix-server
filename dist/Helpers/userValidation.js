"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistrationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userRegistrationSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(5),
    email: joi_1.default
        .string()
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    password: joi_1.default.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
