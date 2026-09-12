const express = require("express");
const { body } = require("express-validator");

const {
  createRFQ,
  getMyRFQs,
  getRFQs,
  getRFQById,
  updateRFQ,
} = require("../controllers/rfq.controller");

const {
  authenticate,
  authorize,
} = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize("BUYER"),
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required"),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),

    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),

    body("location")
      .trim()
      .notEmpty()
      .withMessage("Location is required"),

    body("deadline")
      .isISO8601()
      .withMessage("Please provide a valid deadline"),
  ],
  validate,
  createRFQ
);

router.get(
  "/mine",
  authenticate,
  authorize("BUYER"),
  getMyRFQs
);

router.get(
  "/:id",
  authenticate,
  getRFQById
);

router.patch(
  "/:id",
  authenticate,
  authorize("BUYER"),
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title is required"),

    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Description is required"),

    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),

    body("location")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Location is required"),

    body("deadline")
      .optional()
      .isISO8601()
      .withMessage("Please provide a valid deadline"),

    body("status")
      .optional()
      .isIn(["OPEN", "CLOSED"])
      .withMessage("Status must be OPEN or CLOSED"),
  ],
  validate,
  updateRFQ
);

router.get(
  "/",
  authenticate,
  getRFQs
);

module.exports = router;