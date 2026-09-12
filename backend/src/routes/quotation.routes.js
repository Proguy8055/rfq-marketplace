const express = require("express");
const { body } = require("express-validator");

const {
  createQuotation,
  getRFQQuotations,
  getMyQuotations,
} = require("../controllers/quotation.controller");

const {
  authenticate,
  authorize,
} = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
  "/rfqs/:id/quotations",
  authenticate,
  authorize("SUPPLIER"),
  [
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a valid positive number"),

    body("deliveryTime")
      .trim()
      .notEmpty()
      .withMessage("Delivery time is required"),

    body("notes")
      .optional()
      .trim(),
  ],
  validate,
  createQuotation
);

router.get(
  "/rfqs/:id/quotations",
  authenticate,
  authorize("BUYER"),
  getRFQQuotations
);

router.get(
  "/quotations/mine",
  authenticate,
  authorize("SUPPLIER"),
  getMyQuotations
);

module.exports = router;