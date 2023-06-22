"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const server_1 = require("../server");
const supertest_1 = __importDefault(require("supertest"));
(0, vitest_1.describe)("/user tests", () => {
    (0, vitest_1.it)("Should return 401 if no token is passed", () => {
        return (0, supertest_1.default)(server_1.app)
            .get("/users")
            .expect(401)
            .expect("Content-Type", /json/);
    });
    (0, vitest_1.it)("Should return users if token is passed", () => {
        return (0, supertest_1.default)(server_1.app)
            .get("/users")
            .expect(200)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVlOThiLTc2NzUtNDFiYi1hYjViLWRkNDBjYjUxODc2MSIsInVzZXJuYW1lIjoiWW91bmdib3kiLCJlbWFpbCI6InlvdW5nYm95QGV4YW1wbGUuY29tIiwiYWJvdXQiOiJJIGFtIGEgc29mdHdhcmUgZGV2ZWxvcGVyIHdpdGggb3ZlciA2IHllYXJzIG9mIGV4cGlyaWVuY2UgYW5kICBoYXZlIHdvcmtlZCBpbiBtb3JlIHRoYXQgMTAgcHJvamVjdHMiLCJyb2xlIjoiYWRtaW4iLCJ0aXRsZSI6IlNvZnR3YXJlIERldmVsb3BlciIsImVtYWlsU2VudCI6MSwiaWF0IjoxNjg3MzYzMzQ4LCJleHAiOjE2ODc3MjMzNDh9.Mb1ahqVmhu_Cddi8QQQFh8l5RIvPJ_PkOXD1n9LX6F4");
    });
});
