import { Router } from "express";
import { getTransaction } from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getTransaction").post(verifyJWT, getTransaction);

export default router;
