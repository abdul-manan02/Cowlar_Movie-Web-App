import { expect } from "chai";
import sinon from "sinon";
import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";
import {
  createReviewTable,
  dropReviewTable,
  createReview,
  getMovieReviews,
  getUserReviews,
  updateReview,
  deleteReview,
} from "../services/review.service.js";

describe("createReviewTable", function () {
  let syncStub;
  let req, res;

  beforeEach(function () {
    syncStub = sinon.stub(Review, "sync");
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    syncStub.restore();
  });

  it("should create the review table successfully", async function () {
    syncStub.resolves();
    await createReviewTable(req, res);
    expect(syncStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "Review table created successfully" })).to
      .be.true;
  });

  it("should handle error if table creation fails", async function () {
    const errorMessage = "Error creating review table";
    syncStub.rejects(new Error(errorMessage));
    await createReviewTable(req, res);
    expect(syncStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("dropReviewTable", function () {
  let dropStub;
  let req, res;

  beforeEach(function () {
    dropStub = sinon.stub(Review, "drop");
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    dropStub.restore();
  });

  it("should drop the review table successfully", async function () {
    dropStub.resolves();
    await dropReviewTable(req, res);
    expect(dropStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "Review table dropped successfully" })).to
      .be.true;
  });

  it("should handle error if table dropping fails", async function () {
    const errorMessage = "Error dropping review table";
    dropStub.rejects(new Error(errorMessage));
    await dropReviewTable(req, res);
    expect(dropStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("createReview", function () {
  let createStub, incrementStub;
  let req, res;

  beforeEach(function () {
    createStub = sinon.stub(Review, "create");
    incrementStub = sinon.stub(Movie, "increment");
    req = {
      body: {
        movie_id: "movie123",
      },
      userId: "user123",
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    createStub.restore();
    incrementStub.restore();
  });

  it("should create a review successfully", async function () {
    const mockReview = { id: 1, ...req.body };
    createStub.resolves(mockReview);
    await createReview(req, res);
    expect(createStub.calledOnceWith({ ...req.body, user_id: req.userId })).to
      .be.true;
    expect(
      incrementStub.calledOnceWith("rating", {
        by: 1,
        where: { _id: req.body.movie_id },
      })
    ).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(mockReview)).to.be.true;
  });

  it("should handle error if review creation fails", async function () {
    const errorMessage = "Error creating review";
    createStub.rejects(new Error(errorMessage));
    await createReview(req, res);
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("getMovieReviews", function () {
    let findAllStub, findByPkStub;
    let req, res;

    beforeEach(function () {
        req = { params: { id: "movie_id_1" } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        findAllStub = sinon.stub(Review, "findAll");
        findByPkStub = sinon.stub(User, "findByPk");
    });

    afterEach(function () {
        findAllStub.restore();
        findByPkStub.restore();
    });

    it("should get movie reviews successfully", async function () {
        const reviews = [
            { id: "review_id_1", user_id: "user_id_1", toJSON: sinon.stub().returnsThis() },
            { id: "review_id_2", user_id: "user_id_2", toJSON: sinon.stub().returnsThis() },
        ];
        const user = { id: "user_id_1" };
        findAllStub.resolves(reviews);
        findByPkStub.resolves(user);
        await getMovieReviews(req, res);
        expect(findAllStub.calledOnceWith({ where: { movie_id: "movie_id_1" } })).to.be.true;
        expect(findByPkStub.calledTwice).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
    });

    it("should handle error during getting movie reviews", async function () {
        const errorMessage = "Error getting movie reviews";
        findAllStub.rejects(new Error(errorMessage));
        await getMovieReviews(req, res);
        expect(findAllStub.calledOnceWith({ where: { movie_id: "movie_id_1" } })).to.be.true;
        expect(findByPkStub.notCalled).to.be.true;
        expect(res.status.calledWith(500)).to.be.true;
    });
});

describe("getUserReviews", function () {
    let findAllStub, findByPkStub;
    let req, res;

    beforeEach(function () {
        req = { userId: "user_id_1" };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        findAllStub = sinon.stub(Review, "findAll");
        findByPkStub = sinon.stub(Movie, "findByPk");
    });

    afterEach(function () {
        findAllStub.restore();
        findByPkStub.restore();
    });

    it("should get user reviews successfully", async function () {
        const reviews = [
            { id: "review_id_1", movie_id: "movie_id_1", toJSON: sinon.stub().returnsThis() },
            { id: "review_id_2", movie_id: "movie_id_2", toJSON: sinon.stub().returnsThis() },
        ];
        const movie = { id: "movie_id_1" };
        findAllStub.resolves(reviews);
        findByPkStub.resolves(movie);
        await getUserReviews(req, res);
        expect(findAllStub.calledOnceWith({ where: { user_id: "user_id_1" } })).to.be.true;
        expect(findByPkStub.calledTwice).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
    });

    it("should handle error during getting user reviews", async function () {
        const errorMessage = "Error getting user reviews";
        findAllStub.rejects(new Error(errorMessage));
        await getUserReviews(req, res);
        expect(findAllStub.calledOnceWith({ where: { user_id: "user_id_1" } })).to.be.true;
        expect(findByPkStub.notCalled).to.be.true;
        expect(res.status.calledWith(500)).to.be.true;
    });
});

describe("updateReview", function () {
  let updateStub;
  let req, res;

  beforeEach(function () {
    updateStub = sinon.stub(Review, "update");
    req = {
      params: { id: "review123" },
      body: { description: "Updated review" },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    updateStub.restore();
  });

  it("should update review successfully", async function () {
    updateStub.resolves([1]);
    await updateReview(req, res);
    expect(
      updateStub.calledOnceWith(
        { review: req.body.description },
        { where: { _id: req.params.id } }
      )
    ).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "Updated successfully" })).to.be.true;
  });

  it("should handle error if review update fails", async function () {
    const errorMessage = "Error updating review";
    updateStub.rejects(new Error(errorMessage));
    await updateReview(req, res);
    expect(res.status.calledWith(500)).to.be.true;
  });

  it("should handle review not found", async function () {
    updateStub.resolves([0]);
    await updateReview(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ error: "Review not found" })).to.be.true;
  });
});

describe("deleteReview", function () {
  let findByPkStub, destroyStub, decrementStub;
  let req, res;

  beforeEach(function () {
    req = { params: { id: "review_id_1" } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    findByPkStub = sinon.stub(Review, "findByPk");
    decrementStub = sinon.stub(Movie, "decrement");
  });

  afterEach(function () {
    findByPkStub.restore();
    decrementStub.restore();
  });

  it("should delete the review successfully", async function () {
    const review = {
      id: "review_id_1",
      movie_id: "movie_id_1",
      destroy: sinon.stub().resolves(),
    };
    findByPkStub.resolves(review);
    await deleteReview(req, res);
    expect(findByPkStub.calledOnceWith("review_id_1")).to.be.true;
    expect(review.destroy.calledOnce).to.be.true;
    expect(
      decrementStub.calledOnceWith("rating", {
        by: 1,
        where: { _id: "movie_id_1" },
      })
    ).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "review_id_1 deleted successfully" })).to
      .be.true;
  });

  it("should return 404 if review not found", async function () {
    findByPkStub.resolves(null);
    await deleteReview(req, res);
    expect(findByPkStub.calledOnceWith("review_id_1")).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ error: "Review not found" })).to.be.true;
  });

  it("should handle error during review deletion", async function () {
    const errorMessage = "Error deleting review";
    const review = {
      id: "review_id_1",
      movie_id: "movie_id_1",
      destroy: sinon.stub().rejects(new Error(errorMessage)),
    };
    findByPkStub.resolves(review);
    await deleteReview(req, res);
    expect(findByPkStub.calledOnceWith("review_id_1")).to.be.true;
    expect(review.destroy.calledOnce).to.be.true;
    expect(decrementStub.notCalled).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});
