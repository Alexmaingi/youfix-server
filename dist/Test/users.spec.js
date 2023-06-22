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
(0, vitest_1.describe)("/user tests", () => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.it)("should return 401 if no token is passed", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .get("/users")
            .expect(401)
            .expect("Content-Type", /json/)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unathorized"),
            }));
        });
    }));
    (0, vitest_1.it)("Should login user (200) given valid email and password", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .post("/users/login")
            .expect("Content-Type", /json/)
            .expect(200)
            .send({
            email: "m@gmail.com",
            password: "alexmaingi",
        });
    }));
    (0, vitest_1.it)("Should login admin (200) given valid email and password", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .post("/users/login")
            .expect("Content-Type", /json/)
            .expect(200)
            .send({
            email: "maingi@gmail.com",
            password: "youngboy",
        });
    }));
    (0, vitest_1.it)("should get users (200) if token is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .get("/users")
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVlOThiLTc2NzUtNDFiYi1hYjViLWRkNDBjYjUxODc2MSIsInVzZXJuYW1lIjoiWW91bmdib3kiLCJlbWFpbCI6InlvdW5nYm95QGV4YW1wbGUuY29tIiwiYWJvdXQiOiJJIGFtIGEgc29mdHdhcmUgZGV2ZWxvcGVyIHdpdGggb3ZlciA2IHllYXJzIG9mIGV4cGlyaWVuY2UgYW5kICBoYXZlIHdvcmtlZCBpbiBtb3JlIHRoYXQgMTAgcHJvamVjdHMiLCJyb2xlIjoiYWRtaW4iLCJ0aXRsZSI6IlNvZnR3YXJlIERldmVsb3BlciIsImVtYWlsU2VudCI6MSwiaWF0IjoxNjg3Mzc0NjgzLCJleHAiOjE2ODc3MzQ2ODN9.LePqbvG0IACNPvSV3mk4rQ6JnsUaVF9qwb1D_-1jy6Y")
            .expect(200)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toBeTruthy();
        });
    }));
    (0, vitest_1.it)("should not get users (403) if token is invalid ", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .get("/users")
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MTYxNjA1LCJleHAiOjE2ODc1MjE2MDV9.4Ru0e6bY9idd8_SwbQJognM6egRMkLhW96Ul_by2wyI")
            .expect(403);
    }));
    (0, vitest_1.it)("Should return 500 if user email exists", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .post("/users")
            .expect("Content-Type", /json/)
            .send({
            username: "Alexmaingi",
            email: "m@gmail.com",
            password: "alexmaingi@1",
        })
            .expect(500);
    }));
    (0, vitest_1.it)("Should return 401 if user tries to delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .delete("/users/acabe409-4bef-4a60-a4ff-23341690959f")
            .expect(401)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjYWJlNDA5LTRiZWYtNGE2MC1hNGZmLTIzMzQxNjkwOTU5ZiIsInVzZXJuYW1lIjoiQWxleG1haW5naSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJhYm91dCI6bnVsbCwicm9sZSI6InVzZXIiLCJ0aXRsZSI6bnVsbCwiZW1haWxTZW50IjpudWxsLCJpYXQiOjE2ODc0MDU4MzAsImV4cCI6MTY4Nzc2NTgzMH0.IW4YpVAV5QcNOXmqlIy6qgUz1YyIA-5YtNtDXCT78zc")
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unauthorized"),
            }));
        });
    }));
    (0, vitest_1.it)("Should return 200 if the admin deletes a user", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(server_1.app)
            .delete("/users/41dc7666-beaf-4cd2-bcbd-0e26f2046f48")
            .expect(200)
            .expect("Content-Type", /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxZGM3NjY2LWJlYWYtNGNkMi1iY2JkLTBlMjZmMjA0NmY0OCIsInVzZXJuYW1lIjoiTWFpbmdpIiwiZW1haWwiOiJtYWluZ2lAZ21haWwuY29tIiwiYWJvdXQiOm51bGwsInJvbGUiOiJhZG1pbiIsInRpdGxlIjpudWxsLCJlbWFpbFNlbnQiOm51bGwsImlhdCI6MTY4NzQxMDkxMiwiZXhwIjoxNjg3NzcwOTEyfQ.3K54-Xrm93A4ScHTE5IeDZHm8dAedbxiOUwsFVmpdlk")
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("User Deleted"),
            }));
        });
    }));
}));
