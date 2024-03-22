import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Budget } from "../models/budget.model.js";
import { sendEmail } from "../services/email.service.js";

const createBudget = asyncHandler(async (req, res) => {
  const {
    budget_category,
    budget_title,
    budget_description,
    budget_amount,
    threshold_amount,
  } = req.body;

  if (
    [
      budget_category,
      budget_title,
      budget_description,
      budget_amount,
      threshold_amount,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const budget = await Budget.create({
    budget_category,
    budget_title,
    budget_description,
    budget_amount,
    threshold_amount,
    user: req.user._id,
  });

  const createdBudget = await Budget.findById(budget._id);

  if (!createdBudget) {
    throw new ApiError(500, "Something went wrong while creating the budget");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdBudget, "Budget created successfully"));
});

const getBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.find({
    user: req.user._id,
  });

  //  send email if budget limit is reached
  const user = await User.findById(req.user._id);

  const title = budget.budget_title;
  const budget_amount = budget.budget_amount;
  const threshold_amount = budget.threshold_amount;

  const totalSpent = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$expense_amount" },
      },
    },
  ]);

  if (totalSpent.total > threshold_amount) {
    sendEmail(
      user.email,
      "Reminder",
      `You have a reminder for ${title} on ${date}`
    );
  }
  if (!budget) {
    throw new ApiError(404, "No budget found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget retrieved successfully"));
});

const updateBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );

  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget updated successfully"));
});

const deleteBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findByIdAndDelete(req.params.id);

  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget deleted successfully"));
});

export { createBudget, getBudget, updateBudget, deleteBudget };
