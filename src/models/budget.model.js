import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema(
  {
    budget_category: {
      type: String,
      required: true,
    },
    budget_title: {
      type: String,
      required: true,
    },
    budget_description: {
      type: String,
      required: true,
    },
    budget_amount: {
      type: Number,
      required: true,
    },
    threshold_amount: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Budget = mongoose.model("Budget", budgetSchema);
