import { Router } from "express";
import {
  createReminder,
  getReminder,
  updateReminder,
  deleteReminder,
} from "../controllers/reminder.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addReminder").post(verifyJWT, createReminder);
router.route("/getReminder").get(verifyJWT, getReminder);
router.route("/updateReminder/:id").patch(verifyJWT, updateReminder);
router.route("/deleteReminder/:id").delete(verifyJWT, deleteReminder);

export default router;
