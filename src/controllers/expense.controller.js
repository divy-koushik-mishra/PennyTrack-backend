import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";
import { Transaction } from "../models/transaction.model.js";

const createExpense = asyncHandler(async (req, res) => {
  const {
    expense_description,
    expense_category,
    expense_amount,
    expense_date,
  } = req.body;

  if (
    [expense_description, expense_category, expense_amount, expense_date].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const expense = await Expense.create({
    expense_description,
    expense_category,
    expense_amount,
    expense_date,
    user: req.user._id,
  });
  const transactionExpense = await Transaction.create({
    transaction_description: expense_description,
    transaction_category: expense_category,
    transaction_amount: expense_amount,
    transaction_type: "expense",
    transaction_date: new Date(),
    transaction_time: new Date(),
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
  const expense = await Expense.find({
    user: req.user._id,
  });

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

const getTotalExpense = asyncHandler(async (req, res) => {
  const totalExpense = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $group: {
        _id: null,
        totalExpense: { $sum: "$expense_amount" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        totalExpense[0],
        "Total expense retrieved successfully"
      )
    );
});

const getExpenseByCategory = asyncHandler(async (req, res) => {
  const expense = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $group: {
        _id: "$expense_category",
        total: { $sum: "$expense_amount" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        expense,
        "Expense by category retrieved successfully"
      )
    );
});

export {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getTotalExpense,
  getExpenseByCategory,
};
