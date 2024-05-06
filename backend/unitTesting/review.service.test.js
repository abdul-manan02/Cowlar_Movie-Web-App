import { expect } from "chai";
import sinon from "sinon";
import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";
import {
  createReviewHandler,
  getMovieReviewsHandler,
  getUserReviewsHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from "../services/review.service.js";

describe("Review Service", () => {
  let findByPkStub;

  afterEach(function () {
    if (findByPkStub) {
      findByPkStub.restore();
    }
  });

  describe("createReviewHandler", function () {
    let createStub, incrementStub;
    let reviewData, userId;

    beforeEach(function () {
      createStub = sinon.stub(Review, "create");
      incrementStub = sinon.stub(Movie, "increment");
      reviewData = {
        movie_id: "movie123",
      };
      userId = "user123";
    });

    afterEach(function () {
      createStub.restore();
      incrementStub.restore();
    });

    it("should create a review successfully", async function () {
      const mockReview = { id: 1, ...reviewData };
      createStub.resolves(mockReview);

      const result = await createReviewHandler(reviewData, userId);

      expect(createStub.calledOnceWith({ ...reviewData, user_id: userId })).to
        .be.true;
      expect(
        incrementStub.calledOnceWith("rating", {
          by: 1,
          where: { _id: reviewData.movie_id },
        })
      ).to.be.true;
      expect(result).to.deep.equal(mockReview);
    });

    it("should throw an error if review creation fails", async function () {
      const errorMessage = "Error creating review";
      createStub.rejects(new Error(errorMessage));

      try {
        await createReviewHandler(reviewData, userId);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
    });
  });

  describe("getMovieReviewsHandler", function () {
    let findAllStub, findByPkStub;

    beforeEach(function () {
      findAllStub = sinon.stub(Review, "findAll");
      findByPkStub = sinon.stub(User, "findByPk");
    });

    afterEach(function () {
      findAllStub.restore();
      findByPkStub.restore();
    });

    it("should get movie reviews successfully", async function () {
      const reviews = [
        {
          id: "review_id_1",
          user_id: "user_id_1",
          toJSON: sinon
            .stub()
            .returns({ id: "review_id_1", user_id: "user_id_1" }),
        },
        {
          id: "review_id_2",
          user_id: "user_id_2",
          toJSON: sinon
            .stub()
            .returns({ id: "review_id_2", user_id: "user_id_2" }),
        },
      ];
      const user1 = { id: "user_id_1" };
      const user2 = { id: "user_id_2" };
      findAllStub.resolves(reviews);
      findByPkStub.withArgs("user_id_1").resolves(user1);
      findByPkStub.withArgs("user_id_2").resolves(user2);

      const result = await getMovieReviewsHandler("movie_id_1");

      expect(findAllStub.calledOnceWith({ where: { movie_id: "movie_id_1" } }))
        .to.be.true;
      expect(findByPkStub.calledTwice).to.be.true;
      expect(result).to.deep.equal([
        { id: "review_id_1", user_id: "user_id_1", user: user1 },
        { id: "review_id_2", user_id: "user_id_2", user: user2 },
      ]);
    });

    it("should handle error during getting movie reviews", async function () {
      const errorMessage = "Error getting movie reviews";
      findAllStub.rejects(new Error(errorMessage));

      try {
        await getMovieReviewsHandler("movie_id_1");
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
    });
  });

  describe("getUserReviewsHandler", function () {
    let findAllStub, findByPkStub;

    beforeEach(function () {
      findAllStub = sinon.stub(Review, "findAll");
      findByPkStub = sinon.stub(Movie, "findByPk");
    });

    afterEach(function () {
      findAllStub.restore();
      findByPkStub.restore();
    });

    it("should get user reviews successfully", async function () {
      const reviews = [
        {
          id: "review_id_1",
          movie_id: "movie_id_1",
          toJSON: function () {
            return { id: this.id, movie_id: this.movie_id };
          },
        },
        {
          id: "review_id_2",
          movie_id: "movie_id_2",
          toJSON: function () {
            return { id: this.id, movie_id: this.movie_id };
          },
        },
      ];
      const movie1 = { id: "movie_id_1" };
      const movie2 = { id: "movie_id_2" };
      findAllStub.resolves(reviews);
      findByPkStub.withArgs("movie_id_1").resolves(movie1);
      findByPkStub.withArgs("movie_id_2").resolves(movie2);

      const result = await getUserReviewsHandler("user_id_1");

      expect(findAllStub.calledOnceWith({ where: { user_id: "user_id_1" } })).to
        .be.true;
      expect(findByPkStub.calledTwice).to.be.true;
      expect(result).to.deep.equal([
        {
          id: "review_id_1",
          movie_id: "movie_id_1",
          movie: { id: "movie_id_1" },
        },
        {
          id: "review_id_2",
          movie_id: "movie_id_2",
          movie: { id: "movie_id_2" },
        },
      ]);
    });

    it("should handle error during getting user reviews", async function () {
      const errorMessage = "Error getting user reviews";
      findAllStub.rejects(new Error(errorMessage));

      try {
        await getUserReviewsHandler("user_id_1");
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
    });
  });

  describe("updateReviewHandler", function () {
    let updateStub;

    beforeEach(function () {
      updateStub = sinon.stub(Review, "update");
    });

    afterEach(function () {
      updateStub.restore();
    });

    it("should update a review successfully", async function () {
      const id = "review_id_1";
      const description = "Updated description";
      updateStub.resolves([1]);
      const result = await updateReviewHandler(id, description);
      expect(
        updateStub.calledOnceWith(
          { review: description },
          { where: { _id: id } }
        )
      ).to.be.true;
      expect(result).to.deep.equal({ msg: "Updated successfully" });
    });

    it("should throw an error if review not found during update", async function () {
      const id = "review_id_1";
      const description = "Updated description";
      updateStub.resolves([0]);
      try {
        await updateReviewHandler(id, description);
      } catch (error) {
        expect(error.message).to.equal("Review not found");
      }
    });

    it("should handle error during update", async function () {
      const errorMessage = "Error updating review";
      updateStub.rejects(new Error(errorMessage));
      const id = "review_id_1";
      const description = "Updated description";
      try {
        await updateReviewHandler(id, description);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }
    });
  });

  describe("deleteReviewHandler", function () {
    let findByPkStub, destroyStub, decrementStub;

    beforeEach(function () {
      findByPkStub = sinon.stub(Review, "findByPk");
      destroyStub = sinon.stub(Review.prototype, "destroy");
      decrementStub = sinon.stub(Movie, "decrement");
    });

    afterEach(function () {
      findByPkStub.restore();
      destroyStub.restore();
      decrementStub.restore();
    });

    it("should delete a review successfully", async function () {
      const id = "review_id_1";
      const review = {
        id: id,
        movie_id: "movie_id_1",
        destroy: sinon.stub().resolves(),
      };
      findByPkStub.resolves(review);
      const result = await deleteReviewHandler(id);
      expect(findByPkStub.calledOnceWith(id)).to.be.true;
      expect(review.destroy.calledOnce).to.be.true;
      expect(
        decrementStub.calledOnceWith("rating", {
          by: 1,
          where: { _id: review.movie_id },
        })
      ).to.be.true;
      expect(result).to.deep.equal({ msg: `${id} deleted successfully` });
    });

    it("should throw an error if review not found during deletion", async function () {
      const id = "review_id_1";
      findByPkStub.resolves(null);
      try {
        await deleteReviewHandler(id);
      } catch (error) {
        expect(error.message).to.equal("Review not found");
      }
    });

    it("should delete a review successfully", async function () {
      const id = "review_id_1";
      const review = {
        id: id,
        movie_id: "movie_id_1",
        destroy: sinon.stub().resolves(),
      };
      findByPkStub.resolves(review);
      const result = await deleteReviewHandler(id);
      expect(findByPkStub.calledOnceWith(id)).to.be.true;
      expect(review.destroy.calledOnce).to.be.true;
      expect(
        decrementStub.calledOnceWith("rating", {
          by: 1,
          where: { _id: review.movie_id },
        })
      ).to.be.true;
      expect(result).to.deep.equal({ msg: `${id} deleted successfully` });
    });
  });
});
