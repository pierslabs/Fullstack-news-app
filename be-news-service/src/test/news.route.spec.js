require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app.js");
const { dbCleanUp } = require("./common.js");
const New = require("../api/models/news.model.js");

describe("Tests on News Routes", () => {
  const NewMock = {
    title:
      "Elon Musk breaks silence after 10 million Twitter users vote for him to step down  The Guardian",
    description:
      "The billionaire says only paid Twitter Blue subscribers will be able to vote in future policyrelated polls on the platform",
    content:
      "Elon Musk has tweeted for the first time since more than 10 million people voted in favour of him stepping down as Twitters chief executive, saying that only paid Twitter Blue subscribers will be abl…",
    author: "_test",
  };

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

    it("Route works", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/v1/news", () => {
    afterEach(async () => {
      await dbCleanUp();
    });

    it("Route works", async () => {
      const response = await request(app).post("/api/v1/news").send(NewMock);
      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("should be inserted correctly", async () => {
      const response = await request(app).post("/api/v1/news").send(NewMock);

      expect(response.body._id).toBeDefined();
      expect(response.body.title).toBe(NewMock.title);
    });

    it("should be inserted error", async () => {
      const response = await request(app)
        .post("/api/v1/news")
        .send({ ...New, title: 12345 });
      expect(response.status).toBe(400);
      expect(response._body[0].msg).toBe("Invalid value");
    });
  });

  describe("PUT /api/v1/news/:id", () => {
    let createNew;
    beforeEach(async () => {
      createNew = await New.create(NewMock);
    });
    afterEach(async () => {
      await New.findByIdAndDelete(createNew._id);
    });

    it("should be update correctly", async () => {
      const response = await request(app)
        .put(`/api/v1/news/${createNew._id}`)
        .send({
          title:
            "Tourists stuck in Machu Picchu due to Peru protests airlifted out",
          author: "Vanessa Buschschlüter",
          content:
            "A wave of protests has been sweeping through Peru following the impeachment of Presiden...",
          description: "Peruvian authorities have....",
        });

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("should be error updateNew", async () => {
      const response = await request(app)
        .put(`/api/v1/news/${createNew._id}`)
        .send({ ...createNew, title: 1111 });

      expect(response.status).toBe(400);
    });
  });

  describe("PATCH /api/v1/news/:id", () => {
    let createNew;
    beforeEach(async () => {
      createNew = await New.create(NewMock);
    });
    afterAll(async () => {
      await New.findByIdAndDelete(createNew._id);
    });

    it("should be archived correctly", async () => {
      const response = await request(app)
        .patch(`/api/v1/news/${createNew._id}`)
        .send();
      expect(response.body.modifiedCount).toBe(1);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("should be error archived", async () => {
      const response = await request(app)
        .patch(`/api/v1/news/63a1ff7359b5341df1a86124`)
        .send();

      expect(response.status).toBe(500);
    });
  });

  describe("DELETE /api/v1/news/:id", () => {
    let createNew;
    beforeAll(async () => {
      createNew = await New.create(NewMock);
    });

    it("should be error deleted", async () => {
      const response = await request(app)
        .delete(`/api/v1/news/63a1ff7359b5341df1a86124`)
        .send();

      expect(response.status).toBe(500);
    });

    it("should be deleted", async () => {
      const response = await request(app)
        .delete(`/api/v1/news/${createNew._id}`)
        .send();
      expect(response.status).toBe(204);
    });
  });
});
