import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../server";

describe("/answers tests", () => {
  it("should return 401 if no token is passed", () => {
    return request(app)
      .get("/answers/551e5dbe-feab-4ced-b8a0-29331ce6c500")
      .expect(401)
      .expect("Content-Type", /json/)
      .then((response: request.Response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.stringMatching("Unathorized"),
          })
        );
      });
  });

  it("should return 200 and answers if token exists ", () => {
    return request(app)
      .get("/answers/551e5dbe-feab-4ced-b8a0-29331ce6c500")
      .expect(200)
      .expect("Content-Type", /json/)
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjYWJlNDA5LTRiZWYtNGE2MC1hNGZmLTIzMzQxNjkwOTU5ZiIsInVzZXJuYW1lIjoiQWxleG1haW5naSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJhYm91dCI6bnVsbCwicm9sZSI6InVzZXIiLCJ0aXRsZSI6bnVsbCwiZW1haWxTZW50IjpudWxsLCJpYXQiOjE2ODczNzQ5MTYsImV4cCI6MTY4NzczNDkxNn0.q45nz0HTich3DUVC2rCmj_Y-B2zUAyHXyq2yjMM-yVk"
      )
      .then((response: request.Response) => {
        expect(response.body).toBeTruthy();
      });
  });

  it("should return 201 and add answer ", () => {
    return request(app)
      .post(
        "/answers/1e395902-fc4a-4dd4-bb8d-17805cc81e08/8961d036-ef55-47e1-b807-5c86929bbc27"
      )
      .expect(201)
      .expect("Content-Type", /json/)
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjYWJlNDA5LTRiZWYtNGE2MC1hNGZmLTIzMzQxNjkwOTU5ZiIsInVzZXJuYW1lIjoiQWxleG1haW5naSIsImVtYWlsIjoibUBnbWFpbC5jb20iLCJhYm91dCI6bnVsbCwicm9sZSI6InVzZXIiLCJ0aXRsZSI6bnVsbCwiZW1haWxTZW50IjpudWxsLCJpYXQiOjE2ODczNzQ5MTYsImV4cCI6MTY4NzczNDkxNn0.q45nz0HTich3DUVC2rCmj_Y-B2zUAyHXyq2yjMM-yVk"
      )
      .send({
        answer: "the looong answer pt 5",
      })
      .then((response: request.Response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.stringMatching("answer submitted"),
          })
        );
      });
  });

  it("should return 200 and mark answer as preferred ", () => {
    return request(app)
      .post("/answers/answer/accepted/83610b71-2704-4c6c-9b30-7241c3959fd2")
      .expect(200)
      .expect("Content-Type", /json/)
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMDRhNDc5NS04ZWRiLTQxYzMtYjc3ZS1mOTg3ZjhiNjVmMzgiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95QGdtYWlsLmNvbSIsImxvY2F0aW9uIjoiTnllcmkiLCJhYm91dCI6IkFib3V0IG1lZWVlZSA6KSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3MjYyNTE0LCJleHAiOjE2ODc2MjI1MTR9.sYO4A4Tuyi9CXjKSgs_pbuaShJTYylzwtrvvO_FErcE"
      )
      .send({
        qid: "551e5dbe-feab-4ced-b8a0-29331ce6c500",
      })
      .then((response: request.Response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.stringMatching("marked as preferred"),
          })
        );
      });
  });
});
