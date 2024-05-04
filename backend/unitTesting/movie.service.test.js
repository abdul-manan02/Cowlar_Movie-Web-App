import { expect } from "chai";
import sinon from "sinon";
import Sequelize from 'sequelize';
import Movie from "../models/movie.model.js";
import {
  createMovieTable,
  dropMovieTable,
  createMovie,
  getMovies,
  getUserMovies,
  searchMovie,
} from "../services/movie.service.js";

describe("createMovieTable", function () {
  let syncStub;
  let req, res;

  beforeEach(function () {
    syncStub = sinon.stub(Movie, "sync");
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    syncStub.restore();
  });

  it("should create the movie table successfully", async function () {
    syncStub.resolves();
    await createMovieTable(req, res);
    expect(syncStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "Movie table created successfully" })).to
      .be.true;
  });

  it("should handle error if table creation fails", async function () {
    const errorMessage = "Error creating movie table";
    syncStub.rejects(new Error(errorMessage));
    await createMovieTable(req, res);
    expect(syncStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("dropMovieTable", function () {
  let dropStub;
  let req, res;

  beforeEach(function () {
    dropStub = sinon.stub(Movie, "drop");
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    dropStub.restore();
  });

  it("should drop the movie table successfully", async function () {
    dropStub.resolves();
    await dropMovieTable(req, res);
    expect(dropStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ msg: "Movie table dropped successfully" })).to
      .be.true;
  });

  it("should handle error if table dropping fails", async function () {
    const errorMessage = "Error dropping movie table";
    dropStub.rejects(new Error(errorMessage));
    await dropMovieTable(req, res);
    expect(dropStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("createMovie", function () {
  let createStub;
  let req, res;

  beforeEach(function () {
    createStub = sinon.stub(Movie, "create");
    req = {
      body: {
        title: "Test Movie",
        description: "Test description",
        release_year: 2024,
        user_id: "user123",
        image_url: "test_image_url",
        video_url: "test_video_url",
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
  });

  it("should create a movie successfully", async function () {
    const createdMovie = {
      _id: "test_movie_id",
      title: "Test Movie",
      description: "Test description",
      release_year: 2024,
      user_id: "user123",
      image_url: "test_image_url",
      video_url: "test_video_url",
      rating: 0,
    };
    createStub.resolves(createdMovie);
    await createMovie(req, res);
    expect(createStub.calledOnceWith(req.body)).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(createdMovie)).to.be.true;
  });

  it("should handle error if movie creation fails", async function () {
    const errorMessage = "Error creating movie";
    createStub.rejects(new Error(errorMessage));
    await createMovie(req, res);
    expect(createStub.calledOnceWith(req.body)).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("getMovies", function () {
  let findAllStub;
  let req, res;

  beforeEach(function () {
    findAllStub = sinon.stub(Movie, "findAll");
    req = {
      query: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    findAllStub.restore();
  });

  it("should get all movies successfully without sorting", async function () {
    const mockMovies = [
      { id: 1, title: "Movie 1", createdAt: new Date(), rating: 4 },
      { id: 2, title: "Movie 2", createdAt: new Date(), rating: 3 },
    ];
    findAllStub.resolves(mockMovies);
    await getMovies(req, res);
    expect(findAllStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(mockMovies)).to.be.true;
  });

  it("should get all movies sorted by latest", async function () {
    const mockMovies = [
      { id: 1, title: "Movie 1", createdAt: new Date(), rating: 4 },
      { id: 2, title: "Movie 2", createdAt: new Date(), rating: 3 },
    ];
    const expectedSortedMovies = [...mockMovies].sort(
      (a, b) => b.createdAt - a.createdAt
    );
    findAllStub.resolves(mockMovies);
    req.query.sortBy = "latest";
    await getMovies(req, res);
    expect(findAllStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(expectedSortedMovies)).to.be.true;
  });

  it("should get all movies sorted by rating", async function () {
    const mockMovies = [
      { id: 1, title: "Movie 1", createdAt: new Date(), rating: 4 },
      { id: 2, title: "Movie 2", createdAt: new Date(), rating: 3 },
    ];
    const expectedSortedMovies = [...mockMovies].sort(
      (a, b) => b.rating - a.rating
    );
    findAllStub.resolves(mockMovies);
    req.query.sortBy = "rating";
    await getMovies(req, res);
    expect(findAllStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(expectedSortedMovies)).to.be.true;
  });

  it("should handle error if getting movies fails", async function () {
    const errorMessage = "Error getting movies";
    findAllStub.rejects(new Error(errorMessage));
    await getMovies(req, res);
    expect(findAllStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe("getUserMovies", function () {
  let findAllStub;
  let req, res;

  beforeEach(function () {
    findAllStub = sinon.stub(Movie, "findAll");
    req = {
      userId: "user123",
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(function () {
    findAllStub.restore();
  });

  it("should get user movies successfully", async function () {
    const mockUserMovies = [
      { id: 1, title: "Movie 1", user_id: "user123" },
      { id: 2, title: "Movie 2", user_id: "user123" },
    ];
    findAllStub.resolves(mockUserMovies);
    await getUserMovies(req, res);
    expect(findAllStub.calledOnceWith({ where: { user_id: req.userId } })).to.be
      .true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(mockUserMovies)).to.be.true;
  });

  it("should handle error if getting user movies fails", async function () {
    const errorMessage = "Error getting user movies";
    findAllStub.rejects(new Error(errorMessage));
    await getUserMovies(req, res);
    expect(findAllStub.calledOnceWith({ where: { user_id: req.userId } })).to.be
      .true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});

describe('searchMovie', function() {
    let findAllStub;
    let req, res;

    beforeEach(function() {
        findAllStub = sinon.stub(Movie, 'findAll');
        req = {
            query: { title: 'Test' }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    afterEach(function() {
        findAllStub.restore();
    });

    it('should search for movies successfully', async function() {
        const mockMovies = [
            { id: 1, title: 'Test Movie 1' },
            { id: 2, title: 'Test Movie 2' }
        ];
        findAllStub.resolves(mockMovies);
        await searchMovie(req, res);
        expect(findAllStub.calledOnceWith({
            where: {
                title: {
                    [Sequelize.Op.like]: '%Test%'
                }
            }
        })).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(mockMovies)).to.be.true;
    });

    it('should handle error if search fails', async function() {
        const errorMessage = 'Error searching for movies';
        findAllStub.rejects(new Error(errorMessage));
        await searchMovie(req, res);
        expect(findAllStub.calledOnceWith({
            where: {
                title: {
                    [Sequelize.Op.like]: '%Test%'
                }
            }
        })).to.be.true;
        expect(res.status.calledWith(500)).to.be.true;
    });
});