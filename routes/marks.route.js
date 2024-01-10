const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { marksController } = require("../controllers");

router.post("/add", auth(), marksController.addMarks);
router.get("/get/:id", auth(), marksController.marksList);

module.exports = router;
