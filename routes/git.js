/*
    Git route
    host + /api/github
*/
const controllers = require("../controllers/git.controller");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  console.log("ser require el slash");
  res.json({
    ok: true,
  });
});

router.get("/user/:user", controllers.getUser);

router.get("/repo/:user/:reponame", controllers.getRepo);

router.get("/repos/:user", controllers.getRepos);

module.exports = router;
