import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";

const createExpense = asyncHandler(async (req, res) => {
  const { expense_description, expense_category, expense_amount } = req.body;

  if (
    [expense_description, expense_category, expense_amount].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const expense = await Expense.create({
    expense_description,
    expense_category,
    expense_amount,
    user: req.user._id,
  });

  const createdExpense = await Expense.findById(expense._id);

  if (!createdExpense) {
    throw new ApiError(500, "Something went wrong while creating the expense");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdExpense, "Expense created successfully"));
});

const getExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ user: req.user._id, isDeleted: false });

  if (!expense) {
    throw new ApiError(404, "No expense found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense retrieved successfully"));
});

const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );

  if (!expense) {
    throw new ApiError(404, "No expense found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully"));
});

const deleteExpense = asyncHandler(async (req, res) => {});

export { createExpense, getExpense, updateExpense, deleteExpense };
