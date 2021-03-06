const router = require("express").Router();
//require middlewares
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const FilterMiddleware = require("../middlewares/FilterMiddleware");
const ValidationMiddleware = require("../middlewares/ValidationMiddleware");

//require controllers
const MovieController = require("../controllers/MovieController");
const AuthController = require("../controllers/AuthController");
const ReviewController = require("../controllers/ReviewController");

//auth routes
router.post("/auth/login", AuthController.login);
router.post(
  "/auth/signup",
  ValidationMiddleware.validate,
  AuthController.signup
);
router.post("/auth/refresh_token", AuthController.refreshToken);
router.delete("/auth/logout", AuthController.logout);

//movie routes
//list
router.get("/movies", FilterMiddleware.filterMovies, MovieController.list);
//read
router.get("/movies/:id", MovieController.read);

//review routes

//list reviews of a movie
router.get("/reviews/movie/:movieId", ReviewController.list);

//create
router.post(
  "/reviews",
  AuthMiddleware.isAuthenticated,
  ValidationMiddleware.validate,
  ReviewController.create
);

//read by author and movie
router.get(
  "/reviews/read/:movieId",
  AuthMiddleware.isAuthenticated,
  ReviewController.read
);

//update
router.put(
  "/reviews/:id",
  AuthMiddleware.isAuthenticated,
  ReviewController.update
);

//delete
router.delete(
  "/reviews/:id",
  AuthMiddleware.isAuthenticated,
  ReviewController.delete
);

module.exports = router;
