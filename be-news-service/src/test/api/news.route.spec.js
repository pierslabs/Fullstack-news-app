require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const { resource } = require("../../app.js");
const app = require("../../app.js");

describe("Tests on News Routes", () => {
  beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe("GET /api/v1/news", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/v1/news").send();
    });

    afterEach(async () => {
      response = "";
    });

    it("Route works", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
