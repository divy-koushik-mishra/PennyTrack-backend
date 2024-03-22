import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Income } from "../models/income.model.js";
import { Transaction } from "../models/transaction.model.js";

const createIncome = asyncHandler(async (req, res) => {
  const { income_description, income_category, income_amount, income_date } =
    req.body;

  if (
    [income_description, income_category, income_amount, income_date].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const income = await Income.create({
    income_description,
    income_category,
    income_amount,
    income_date,
    user: req.user._id,
  });

  const transactionIncome = await Transaction.create({
    transaction_description: income_description,
    transaction_category: income_category,
    transaction_amount: income_amount,
    transaction_type: "income",
    transaction_date: new Date(),
    transaction_time: new Date(),
    user: req.user._id,
  });

  const createdIncome = await Income.findById(income._id);

  if (!createdIncome) {
    throw new ApiError(500, "Something went wrong while creating the income");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdIncome, "Income created successfully"));
});

const getIncome = asyncHandler(async (req, res) => {
  const income = await Income.find({ user: req.user._id, isDeleted: false });
  return res
    .status(200)
    .json(new ApiResponse(200, income, "Income retrieved successfully"));
});

const updateIncome = asyncHandler(async (req, res) => {
  const income = await Income.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
});

const deleteIncome = asyncHandler(async (req, res) => {});

const getTotalIncome = asyncHandler(async (req, res) => {
  const totalIncome = await Income.aggregate([
    {
      $match: {
        user: req.user._id,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$income_amount" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        totalIncome[0],
        "Total income retrieved successfully"
      )
    );
});

export { createIncome, getIncome, updateIncome, deleteIncome, getTotalIncome };
