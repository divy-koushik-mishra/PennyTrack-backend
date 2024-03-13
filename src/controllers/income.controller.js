import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Income } from "../models/Income.js";

const createIncome = asyncHandler(async (req, res) => {
  const { income_descreption, income_category, income_amount } = req.body;

  return res
    .status(201)
    .json(new ApiResponse(201, income, "Income created successfully"));
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

export { createIncome, getIncome, updateIncome, deleteIncome };
