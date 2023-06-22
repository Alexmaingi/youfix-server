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
            .get("/comments/3e4f4260-4562-430f-bea8-83c01c4d3ee7")
            .expect(401)
            .expect("Content-Type", /json/)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unathorized"),
            }));
        });
    }));
    (0, vitest_1.it)("should return 401 if no token is passed to downvote ", () => {
        return (0, supertest_1.default)(server_1.app)
            .post("/votes/upvote/86279d7c-24c1-4086-b823-91389af1acc1/d060abd2-0f12-4616-888d-012ee54104e7")
            .expect(401)
            .expect("Content-Type", /json/)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unathorized"),
            }));
        });
    });
    (0, vitest_1.it)("should return 401 if no token is passed to downvote ", () => {
        return (0, supertest_1.default)(server_1.app)
            .post("/votes/downvote/86279d7c-24c1-4086-b823-91389af1acc1/d060abd2-0f12-4616-888d-012ee54104e7")
            .expect(401)
            .expect("Content-Type", /json/)
            .then((response) => {
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching("Unathorized"),
            }));
        });
    });
}));
