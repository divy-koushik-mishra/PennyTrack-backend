import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.model.js";

const getTransaction = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const transaction = await Transaction.find({
    user: req.user._id,
  });

  if (!transaction) {
    throw new ApiError(404, "No transaction found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, transaction, "Transaction retrieved successfully")
    );
});

export { getTransaction };
