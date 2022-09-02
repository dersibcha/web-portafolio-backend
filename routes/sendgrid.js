/*
    Git route
    host + /api/sendgrid
*/
const controllers = require("../controllers/sendgrid.controller");
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

router.get("/:email", controllers.sendEmail);

module.exports = router;
