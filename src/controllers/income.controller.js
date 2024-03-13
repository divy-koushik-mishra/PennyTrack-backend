import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Income } from "../models/Income.js";

const createIncome = asyncHandler(async (req, res) => {
  const { income_descreption, income_category, income_amount } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const income = await Income.create({
    income_descreption,
    income_category,
    income_amount,
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

export { createIncome, getIncome, updateIncome, deleteIncome };
