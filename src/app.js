import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//  Routes import
import userRouter from "./routes/user.routes.js";
import transactionRoute from "./routes/transaction.routes.js";
import incomeRoute from "./routes/income.routes.js";
import expenseRoute from "./routes/expense.routes.js";
import reminderRoute from "./routes/reminder.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRoute);
app.use("/api/v1/income", incomeRoute);
app.use("/api/v1/expense", expenseRoute);
app.use("/api/v1/reminder", reminderRoute);

export { app };
