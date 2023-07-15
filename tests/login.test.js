const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

mongoose.set("strictQuery", false);

require("dotenv").config();
const { DB_HOST } = process.env;

const login = require("../controllers/auth/login");

const user = {
  email: "testUser@gmail.com",
  password: "1234567",
};

describe("test login ", () => {
  let server;
  beforeAll(async () => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(80);
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST).then(() => {
      server.close();
    });
  });

  test("login", async () => {
    const res = await request(app).post("/api/users/login", login).send({
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});
