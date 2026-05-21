import express from "express";

import {
  createContact,
  deleteContact,
  getContacts,
  getSingleContact,
  toggleReadStatus,
} from "../controllers/contact.controller.js";

import {validate} from "../middlewares/validation.middleware.js";

import {
  contactIdValidator,
  createContactValidator,
} from "../validations/contact.validation.js";

const router = express.Router();

router.post(
  "/",
  createContactValidator,
  validate,
  createContact
);

router.get("/", getContacts);

router.get(
  "/:id",
  contactIdValidator,
  validate,
  getSingleContact
);

router.delete(
  "/:id",
  contactIdValidator,
  validate,
  deleteContact
);

router.patch(
  "/toggle-read/:id",
  contactIdValidator,
  validate,
  toggleReadStatus
);

export default router;