import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ["income", "expense"] },
    category: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
