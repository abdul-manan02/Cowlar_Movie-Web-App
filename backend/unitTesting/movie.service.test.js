import { expect } from "chai";
import sinon from "sinon";
import Movie from "../models/movie.model.js";
import Sequelize from "sequelize";
import {
  createMovieHandler,
  getMoviesHandler,
  getUserMoviesHandler,
  searchMovieHandler,
} from "../services/movie.service.js";

describe("Movie Service", () => {
  describe("createMovieHandler", function () {
    let createStub;

    beforeEach(function () {
      createStub = sinon.stub(Movie, "create");
    });

    afterEach(function () {
      createStub.restore();
    });

    it("should create a movie successfully", async function () {
      const movieData = {
        title: "Test Movie",
        description: "Test description",
        release_year: 2024,
        image_url: "test_image_url",
        video_url: "test_video_url",
      };
      const userId = "user123";
      const modifiedMovieData = {
        ...movieData,
        user_id: userId,
      };
      const createdMovie = {
        _id: "test_movie_id",
        ...modifiedMovieData,
        rating: 0,
      };
      createStub.resolves(createdMovie);

      const result = await createMovieHandler(movieData, userId);

      expect(createStub.calledOnceWith(modifiedMovieData)).to.be.true;
      expect(result).to.deep.equal(createdMovie);
    });

    it("should handle error if movie creation fails", async function () {
      const movieData = {
        title: "Test Movie",
        description: "Test description",
        release_year: 2024,
        image_url: "test_image_url",
        video_url: "test_video_url",
      };
      const userId = "user123";
      const errorMessage = "Error creating movie";
      createStub.rejects(new Error(errorMessage));

      try {
        await createMovieHandler(movieData, userId);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }

      expect(createStub.calledOnce).to.be.true;
    });
  });

  describe("getMoviesHandler", function () {
    let findAllStub;

    beforeEach(function () {
      findAllStub = sinon.stub(Movie, "findAll");
    });

    afterEach(function () {
      findAllStub.restore();
    });

    it("should get movies sorted by latest", async function () {
      const sortBy = "latest";
      const options = {
        order: [["createdAt", "DESC"]],
      };
      const movies = [
        { id: 1, title: "Movie 1", createdAt: new Date("2024-05-01") },
        { id: 2, title: "Movie 2", createdAt: new Date("2024-05-03") },
      ];
      findAllStub.resolves(movies);

      const result = await getMoviesHandler(sortBy);

      expect(findAllStub.calledOnceWith(options)).to.be.true;
      expect(result).to.deep.equal(movies);
    });

    it("should get movies sorted by rating", async function () {
      const sortBy = "rating";
      const options = {
        order: [["rating", "DESC"]],
      };
      const movies = [
        { id: 1, title: "Movie 1", rating: 4.5 },
        { id: 2, title: "Movie 2", rating: 4.2 },
      ];
      findAllStub.resolves(movies);

      const result = await getMoviesHandler(sortBy);

      expect(findAllStub.calledOnceWith(options)).to.be.true;
      expect(result).to.deep.equal(movies);
    });

    it("should handle error if fetching movies fails", async function () {
      const sortBy = "latest";
      const errorMessage = "Error fetching movies";
      findAllStub.rejects(new Error(errorMessage));

      try {
        await getMoviesHandler(sortBy);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }

      expect(findAllStub.calledOnce).to.be.true;
    });
  });

  describe("getUserMoviesHandler", function () {
    let findAllStub;

    beforeEach(function () {
      findAllStub = sinon.stub(Movie, "findAll");
    });

    afterEach(function () {
      findAllStub.restore();
    });

    it("should get user movies successfully", async function () {
      const userId = "user123";
      const expectedMovies = [
        { id: 1, title: "Movie 1", user_id: userId },
        { id: 2, title: "Movie 2", user_id: userId },
      ];
      findAllStub.resolves(expectedMovies);

      const result = await getUserMoviesHandler(userId);

      expect(findAllStub.calledOnceWith({ where: { user_id: userId } })).to.be
        .true;
      expect(result).to.deep.equal(expectedMovies);
    });

    it("should handle error if fetching user movies fails", async function () {
      const userId = "user123";
      const errorMessage = "Error fetching user movies";
      findAllStub.rejects(new Error(errorMessage));

      try {
        await getUserMoviesHandler(userId);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }

      expect(findAllStub.calledOnceWith({ where: { user_id: userId } })).to.be
        .true;
    });
  });

  describe("searchMovieHandler", function () {
    let findAllStub;

    beforeEach(function () {
      findAllStub = sinon.stub(Movie, "findAll");
    });

    afterEach(function () {
      findAllStub.restore();
    });

    it("should search movies by title successfully", async function () {
      const title = "Test";
      const expectedMovies = [
        { id: 1, title: "Test Movie 1" },
        { id: 2, title: "Another Test Movie" },
      ];
      const expectedOptions = {
        where: {
          title: {
            [Sequelize.Op.like]: `%${title}%`,
          },
        },
      };
      findAllStub.resolves(expectedMovies);

      const result = await searchMovieHandler(title);

      expect(findAllStub.calledOnceWith(expectedOptions)).to.be.true;
      expect(result).to.deep.equal(expectedMovies);
    });

    it("should handle error if searching movies fails", async function () {
      const title = "Test";
      const errorMessage = "Error searching movies";
      findAllStub.rejects(new Error(errorMessage));

      try {
        await searchMovieHandler(title);
      } catch (error) {
        expect(error.message).to.equal(errorMessage);
      }

      const expectedOptions = {
        where: {
          title: {
            [Sequelize.Op.like]: `%${title}%`,
          },
        },
      };
      expect(findAllStub.calledOnceWith(expectedOptions)).to.be.true;
    });
  });
});
