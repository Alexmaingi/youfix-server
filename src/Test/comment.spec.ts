import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../server";

describe("/user tests", async () => {
  it("should return 401 if no token is passed", async () => {
    return request(app)
      .get("/comments/3e4f4260-4562-430f-bea8-83c01c4d3ee7")
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

  it("should return 401 if no token is passed to downvote ", () => {
    return request(app)
      .post(
        "/votes/upvote/86279d7c-24c1-4086-b823-91389af1acc1/d060abd2-0f12-4616-888d-012ee54104e7"
      )
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

  it("should return 401 if no token is passed to downvote ", () => {
    return request(app)
      .post(
        "/votes/downvote/86279d7c-24c1-4086-b823-91389af1acc1/d060abd2-0f12-4616-888d-012ee54104e7"
      )
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
});
