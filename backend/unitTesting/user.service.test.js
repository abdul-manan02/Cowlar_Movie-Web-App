import { expect } from "chai";
import sinon from "sinon";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { handleSignUp, handleSignIn } from "../services/user.service.js";

describe("User Service", () => {
  describe("handleSignUp", () => {
    let bcryptStub;
    let createStub;

    beforeEach(function () {
      bcryptStub = sinon.stub(bcrypt, "hash");
      createStub = sinon.stub(User, "create");
    });

    afterEach(function () {
      bcryptStub.restore();
      createStub.restore();
    });

    it("should sign up user successfully", async function () {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      };
      const hashedPassword = "hashedPassword";
      bcryptStub.withArgs(userData.password, 12).resolves(hashedPassword);
      const newUser = { id: 1, ...userData };
      createStub.resolves(newUser);
      const result = await handleSignUp(userData);
      expect(result).to.deep.equal(newUser);
      expect(
        createStub.calledOnceWith({
          name: userData.name,
          email: userData.email,
          username: userData.username,
          password: hashedPassword,
        })
      ).to.be.true;
    });

    it("should handle error if sign up fails", async function () {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      };
      const errorMessage = "Error signing up user";
      bcryptStub.resolves("hashedPassword");
      createStub.rejects(new Error(errorMessage));
      try {
        await handleSignUp(userData);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
      expect(bcryptStub.calledOnceWith(userData.password, 12)).to.be.true;
      expect(
        createStub.calledOnceWith({
          name: userData.name,
          email: userData.email,
          username: userData.username,
          password: "hashedPassword",
        })
      ).to.be.true;
    });
  });

  describe("handleSignIn", function () {
    let findOneStub;
    let compareStub;
    let jwtStub;

    beforeEach(function () {
      findOneStub = sinon.stub(User, "findOne");
      compareStub = sinon.stub(bcrypt, "compare");
      jwtStub = sinon.stub(jwt, "sign");
    });

    afterEach(function () {
      findOneStub.restore();
      compareStub.restore();
      jwtStub.restore();
    });

    it("should sign in user successfully", async function () {
      const mockUser = { _id: "user123", password: "hashedPassword" };
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      findOneStub.resolves(mockUser);
      compareStub.resolves(true);
      jwtStub.returns("testToken");
      const result = await handleSignIn(req.body.email, req.body.password);
      expect(result).to.deep.equal({ user: mockUser, token: "testToken" });
      expect(findOneStub.calledOnceWith({ where: { email: req.body.email } }))
        .to.be.true;
      expect(compareStub.calledOnceWith(req.body.password, mockUser.password))
        .to.be.true;
      expect(
        jwtStub.calledOnceWith({ userId: mockUser._id }, process.env.JWT_KEY, {
          expiresIn: "24h",
        })
      ).to.be.true;
    });

    it("should handle error if user not found", async function () {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      findOneStub.resolves(null);
      try {
        await handleSignIn(req.body.email, req.body.password);
      } catch (error) {
        expect(error.message).to.equal("User not found");
      }
      expect(findOneStub.calledOnceWith({ where: { email: req.body.email } }))
        .to.be.true;
    });

    it("should handle error if password is incorrect", async function () {
      const mockUser = { _id: "user123", password: "hashedPassword" };
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      findOneStub.resolves(mockUser);
      compareStub.resolves(false);
      try {
        await handleSignIn(req.body.email, req.body.password);
      } catch (error) {
        expect(error.message).to.equal("Invalid password");
      }
      expect(findOneStub.calledOnceWith({ where: { email: req.body.email } }))
        .to.be.true;
      expect(compareStub.calledOnceWith(req.body.password, mockUser.password))
        .to.be.true;
    });

    it("should handle error if sign in fails", async function () {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const errorMessage = "Error signing in user";
      findOneStub.rejects(new Error(errorMessage));
      try {
        await handleSignIn(req.body.email, req.body.password);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
      expect(findOneStub.calledOnceWith({ where: { email: req.body.email } }))
        .to.be.true;
    });

    it("should handle missing email or password in request", async function () {
      const req = {
        body: {},
      };
      try {
        await handleSignIn(req.body.email, req.body.password);
      } catch (error) {
        expect(error.message).to.equal(
          "Bad request. Please provide email and password"
        );
      }
    });
  });
});
