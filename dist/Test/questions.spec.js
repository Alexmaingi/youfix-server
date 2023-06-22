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
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
(0, vitest_1.describe)("/questions tests", () => {
    (0, vitest_1.it)("should return 401 if no token is passed", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .get("/questions")
            .expect(401)
            .expect("Content-Type", /json/)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unathorized"),
            }));
        });
    }));
    (0, vitest_1.it)("should return one question corresponding to the id ", () => {
        return (0, supertest_1.default)(server_1.app)
            .get("/questions/question/1e395902-fc4a-4dd4-bb8d-17805cc81e08")
            .expect(200)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjYWJlNDA5LTRiZWYtNGE2MC1hNGZmLTIzMzQxNjkwOTU5ZiIsInVzZXJuYW1lIjoiQWxleG1haW5naSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJhYm91dCI6bnVsbCwicm9sZSI6InVzZXIiLCJ0aXRsZSI6bnVsbCwiZW1haWxTZW50IjpudWxsLCJpYXQiOjE2ODczNzQ5MTYsImV4cCI6MTY4NzczNDkxNn0.q45nz0HTich3DUVC2rCmj_Y-B2zUAyHXyq2yjMM-yVk")
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                body: "I am a software developer with over 6 years of expirience and  have worked in more that 10 projects",
                date: "2023-06-19T00:00:00.000Z",
                tag_names: null,
                title: "How to reverse git merge",
                username: "Youngboy",
            }));
        });
    });
    (0, vitest_1.it)("Should add Question if token is valid ", () => {
        return (0, supertest_1.default)(server_1.app)
            .post("/questions/acabe409-4bef-4a60-a4ff-23341690959f")
            .expect(201)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVlOThiLTc2NzUtNDFiYi1hYjViLWRkNDBjYjUxODc2MSIsInVzZXJuYW1lIjoiWW91bmdib3kiLCJlbWFpbCI6InlvdW5nYm95QGV4YW1wbGUuY29tIiwiYWJvdXQiOiJJIGFtIGEgc29mdHdhcmUgZGV2ZWxvcGVyIHdpdGggb3ZlciA2IHllYXJzIG9mIGV4cGlyaWVuY2UgYW5kICBoYXZlIHdvcmtlZCBpbiBtb3JlIHRoYXQgMTAgcHJvamVjdHMiLCJyb2xlIjoiYWRtaW4iLCJ0aXRsZSI6IlNvZnR3YXJlIERldmVsb3BlciIsImVtYWlsU2VudCI6MSwiaWF0IjoxNjg3Mzc0NjgzLCJleHAiOjE2ODc3MzQ2ODN9.LePqbvG0IACNPvSV3mk4rQ6JnsUaVF9qwb1D_-1jy6Y");
    });
    (0, vitest_1.it)("Should return 401 if user deletes a question that is not theirs ", () => {
        return (0, supertest_1.default)(server_1.app)
            .delete("/questions/delete/427cbb36-4e56-4794-b7d9-084e7c344578")
            .expect(401)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVlOThiLTc2NzUtNDFiYi1hYjViLWRkNDBjYjUxODc2MSIsInVzZXJuYW1lIjoiWW91bmdib3kiLCJlbWFpbCI6InlvdW5nYm95QGV4YW1wbGUuY29tIiwiYWJvdXQiOiJJIGFtIGEgc29mdHdhcmUgZGV2ZWxvcGVyIHdpdGggb3ZlciA2IHllYXJzIG9mIGV4cGlyaWVuY2UgYW5kICBoYXZlIHdvcmtlZCBpbiBtb3JlIHRoYXQgMTAgcHJvamVjdHMiLCJyb2xlIjoiYWRtaW4iLCJ0aXRsZSI6IlNvZnR3YXJlIERldmVsb3BlciIsImVtYWlsU2VudCI6MSwiaWF0IjoxNjg3Mzc0NjgzLCJleHAiOjE2ODc3MzQ2ODN9.LePqbvG0IACNPvSV3mk4rQ6JnsUaVF9qwb1D_-1jy6Y")
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unauthorized"),
            }));
        });
    });
    (0, vitest_1.it)("should return 401 if no token is passed", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .get("/questions")
            .expect(401)
            .expect("Content-Type", /json/)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unathorized"),
            }));
        });
    }));
    (0, vitest_1.it)("should get questions (200) if token is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .get("/questions")
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVlOThiLTc2NzUtNDFiYi1hYjViLWRkNDBjYjUxODc2MSIsInVzZXJuYW1lIjoiWW91bmdib3kiLCJlbWFpbCI6InlvdW5nYm95QGV4YW1wbGUuY29tIiwiYWJvdXQiOiJJIGFtIGEgc29mdHdhcmUgZGV2ZWxvcGVyIHdpdGggb3ZlciA2IHllYXJzIG9mIGV4cGlyaWVuY2UgYW5kICBoYXZlIHdvcmtlZCBpbiBtb3JlIHRoYXQgMTAgcHJvamVjdHMiLCJyb2xlIjoiYWRtaW4iLCJ0aXRsZSI6IlNvZnR3YXJlIERldmVsb3BlciIsImVtYWlsU2VudCI6MSwiaWF0IjoxNjg3Mzc0NjgzLCJleHAiOjE2ODc3MzQ2ODN9.LePqbvG0IACNPvSV3mk4rQ6JnsUaVF9qwb1D_-1jy6Y")
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toBeTruthy();
        });
    }));
    (0, vitest_1.it)("should not get questions (403) if token is invalid ", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .get("/questions")
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MTYxNjA1LCJleHAiOjE2ODc1MjE2MDV9.4Ru0e6bY9idd8_SwbQJognM6egRMkLhW96Ul_by2wyI")
            .expect(403);
    }));
    (0, vitest_1.it)("Should return 401 if user tries to delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .delete("/questions/acabe409-4bef-4a60-a4ff-23341690959f")
            .expect(401)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjYWJlNDA5LTRiZWYtNGE2MC1hNGZmLTIzMzQxNjkwOTU5ZiIsInVzZXJuYW1lIjoiQWxleG1haW5naSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJhYm91dCI6bnVsbCwicm9sZSI6InVzZXIiLCJ0aXRsZSI6bnVsbCwiZW1haWxTZW50IjpudWxsLCJpYXQiOjE2ODc0MDU4MzAsImV4cCI6MTY4Nzc2NTgzMH0.IW4YpVAV5QcNOXmqlIy6qgUz1YyIA-5YtNtDXCT78zc")
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unauthorized"),
            }));
        });
    }));
    (0, vitest_1.it)("should return 404 if question is not there", () => {
        return (0, supertest_1.default)(server_1.app)
            .get("/questions/question/07d6674b-cc31-443b-aa07-2d80798deacc")
            .expect(404)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVlOThiLTc2NzUtNDFiYi1hYjViLWRkNDBjYjUxODc2MSIsInVzZXJuYW1lIjoiWW91bmdib3kiLCJlbWFpbCI6InlvdW5nYm95QGV4YW1wbGUuY29tIiwiYWJvdXQiOiJJIGFtIGEgc29mdHdhcmUgZGV2ZWxvcGVyIHdpdGggb3ZlciA2IHllYXJzIG9mIGV4cGlyaWVuY2UgYW5kICBoYXZlIHdvcmtlZCBpbiBtb3JlIHRoYXQgMTAgcHJvamVjdHMiLCJyb2xlIjoiYWRtaW4iLCJ0aXRsZSI6IlNvZnR3YXJlIERldmVsb3BlciIsImVtYWlsU2VudCI6MSwiaWF0IjoxNjg3Mzc1MjAwLCJleHAiOjE2ODc3MzUyMDB9.u46C7Gv-AZU3sFzqGmjnHnqcHSG5qj93dq9BUKC4Lgg")
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Question Not Found"),
            }));
        });
    });
    (0, vitest_1.it)("Should add Question if token is valid ", () => {
        return (0, supertest_1.default)(server_1.app)
            .post("/questions/acabe409-4bef-4a60-a4ff-23341690959f")
            .expect(201)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVlOThiLTc2NzUtNDFiYi1hYjViLWRkNDBjYjUxODc2MSIsInVzZXJuYW1lIjoiWW91bmdib3kiLCJlbWFpbCI6InlvdW5nYm95QGV4YW1wbGUuY29tIiwiYWJvdXQiOiJJIGFtIGEgc29mdHdhcmUgZGV2ZWxvcGVyIHdpdGggb3ZlciA2IHllYXJzIG9mIGV4cGlyaWVuY2UgYW5kICBoYXZlIHdvcmtlZCBpbiBtb3JlIHRoYXQgMTAgcHJvamVjdHMiLCJyb2xlIjoiYWRtaW4iLCJ0aXRsZSI6IlNvZnR3YXJlIERldmVsb3BlciIsImVtYWlsU2VudCI6MSwiaWF0IjoxNjg3Mzc0NjgzLCJleHAiOjE2ODc3MzQ2ODN9.LePqbvG0IACNPvSV3mk4rQ6JnsUaVF9qwb1D_-1jy6Y")
            .send({
            title: "merge branches",
            body: "I am a have worked in more that 10 projects",
            tags: [{ tagname: "#Git" }],
        })
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("question submitted"),
            }));
        });
    });
});
