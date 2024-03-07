const express = require("express");
const router = express.Router();

const {
  getAllOutcomes,
  getOutcome,
  getOutcomes,
  updateOutcome,
  deleteOutcome,
} = require("../controllers/outcomeController.js");
const protect = require("../middleware/authentication.js");
const protectAdmin = require("../middleware/adminAuthentication.js");

router.get("/all", protectAdmin, getAllOutcomes);
router.get("/:id", protect, getOutcome);
router.get("/:id/all", protect, getOutcomes);
router.put("/:id", updateOutcome);
router.delete("/:id", deleteOutcome);

module.exports = router;
