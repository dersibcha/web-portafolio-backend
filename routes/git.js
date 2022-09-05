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

router.get("/user/", controllers.getUser);

router.get("/repo/:reponame", controllers.getRepo);

router.get("/repos/", controllers.getRepos);

module.exports = router;
