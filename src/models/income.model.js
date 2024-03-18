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

export const Income = mongoose.model("Income", incomeSchema);
