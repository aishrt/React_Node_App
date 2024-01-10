const express = require("express");

const landingRoute = require("./landing.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const markRoute = require("./marks.route");
const router = express.Router();

const defaultRoutes = [
  {
    path: "",
    route: landingRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/marks",
    route: markRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
