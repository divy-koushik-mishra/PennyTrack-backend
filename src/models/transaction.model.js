import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    transaction_description: {
      type: String,
      required: true,
    },
    transaction_category: {
      type: String,
      required: true,
    },
    transaction_amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
    },
    transaction_date: {
      type: Date,
      required: true,
    },
    transaction_time: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
