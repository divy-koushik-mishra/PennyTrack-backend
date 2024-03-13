import mongoose, { Schema } from "mongoose";

const incomeSchema = new Schema(
  {
    income_description: {
      type: String,
      required: true,
    },
    income_category: {
      type: String,
      required: true,
    },
    income_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Income = mongoose.model("Income", incomeSchema);
