import { expect } from "chai";
import sinon from "sinon";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUserTable,
  dropUserTable,
  signUp,
  signIn,
} from "../services/user.service.js";

describe("createUserTable", function () {
  let syncStub;
  let req, res;

  beforeEach(function () {
    syncStub = sinon.stub(User, "sync");
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    syncStub.restore();
  });

  it("should create the user table successfully", async function () {
    syncStub.resolves();
    await createUserTable(req, res);
    expect(syncStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "User table created successfully" })).to
      .be.true;
  });

  it("should handle error if table creation fails", async function () {
    const errorMessage = "Error creating user table";
    syncStub.rejects(new Error(errorMessage));
    await createUserTable(req, res);
    expect(syncStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("dropUserTable", function () {
  let dropStub;
  let req, res;

  beforeEach(function () {
    dropStub = sinon.stub(User, "drop");
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    dropStub.restore();
  });

  it("should drop the user table successfully", async function () {
    dropStub.resolves();
    await dropUserTable(req, res);
    expect(dropStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "User table dropped successfully" })).to
      .be.true;
  });

  it("should handle error if table dropping fails", async function () {
    const errorMessage = "Error dropping user table";
    dropStub.rejects(new Error(errorMessage));
    await dropUserTable(req, res);
    expect(dropStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("signUp", function () {
  let bcryptStub;
  let createStub;
  let req, res;

  beforeEach(function () {
    bcryptStub = sinon.stub(bcrypt, "hash");
    createStub = sinon.stub(User, "create");
    req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    bcryptStub.restore();
    createStub.restore();
  });

  it("should sign up user successfully", async function () {
    bcryptStub.resolves("hashedPassword");
    const newUser = { id: 1, ...req.body };
    createStub.resolves(newUser);
    await signUp(req, res);
    expect(bcryptStub.calledOnceWith(req.body.password, 12)).to.be.true;
    expect(
      createStub.calledOnceWith({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: "hashedPassword",
      })
    ).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(newUser)).to.be.true;
  });

  it("should handle error if sign up fails", async function () {
    const errorMessage = "Error signing up user";
    bcryptStub.resolves("hashedPassword");
    createStub.rejects(new Error(errorMessage));
    await signUp(req, res);
    expect(bcryptStub.calledOnceWith(req.body.password, 12)).to.be.true;
    expect(
      createStub.calledOnceWith({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: "hashedPassword",
      })
    ).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("signIn", function () {
  let findOneStub;
  let compareStub;
  let jwtStub;
  let req, res;

  beforeEach(function () {
    findOneStub = sinon.stub(User, "findOne");
    compareStub = sinon.stub(bcrypt, "compare");
    jwtStub = sinon.stub(jwt, "sign");
    req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    findOneStub.restore();
    compareStub.restore();
    jwtStub.restore();
  });

  it("should sign in user successfully", async function () {
    const mockUser = { _id: "user123", password: "hashedPassword" };
    findOneStub.resolves(mockUser);
    compareStub.resolves(true);
    jwtStub.returns("testToken");
    await signIn(req, res);
    expect(findOneStub.calledOnceWith({ where: { email: req.body.email } })).to
      .be.true;
    expect(compareStub.calledOnceWith(req.body.password, mockUser.password)).to
      .be.true;
    expect(
      jwtStub.calledOnceWith({ userId: mockUser._id }, process.env.JWT_KEY, {
        expiresIn: "24h",
      })
    ).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ user: mockUser, token: "testToken" })).to.be
      .true;
  });

  it("should handle error if user not found", async function () {
    findOneStub.resolves(null);
    await signIn(req, res);
    expect(findOneStub.calledOnceWith({ where: { email: req.body.email } })).to
      .be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ error: "User not found" })).to.be.true;
  });

  it("should handle error if password is incorrect", async function () {
    const mockUser = { _id: "user123", password: "hashedPassword" };
    findOneStub.resolves(mockUser);
    compareStub.resolves(false);
    await signIn(req, res);
    expect(findOneStub.calledOnceWith({ where: { email: req.body.email } })).to
      .be.true;
    expect(compareStub.calledOnceWith(req.body.password, mockUser.password)).to
      .be.true;
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ error: "Invalid password" })).to.be.true;
  });

  it("should handle error if sign in fails", async function () {
    const errorMessage = "Error signing in user";
    findOneStub.rejects(new Error(errorMessage));
    await signIn(req, res);
    expect(findOneStub.calledOnceWith({ where: { email: req.body.email } })).to
      .be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });

  it("should handle missing email or password in request", async function () {
    req.body = {}; // No email or password provided
    await signIn(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        error: "Bad request. Please provide email and password",
      })
    ).to.be.true;
  });
});
