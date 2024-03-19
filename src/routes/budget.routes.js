import { Router } from "express";
import {
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addBudget").post(verifyJWT, createBudget);
router.route("/getBudget").post(verifyJWT, getBudget);
router.route("/updateBudget/:id").patch(verifyJWT, updateBudget);
router.route("/deleteBudget/:id").delete(verifyJWT, deleteBudget);

export default router;
