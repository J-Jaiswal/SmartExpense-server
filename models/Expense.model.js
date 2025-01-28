import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  //   category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  //   time: { type: String, required: true },
  //   paymentMethod: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
