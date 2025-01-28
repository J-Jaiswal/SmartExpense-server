import express from "express";
import Expense from "../models/Expense.model.js";

const router = express.Router();

// Add an Expense
router.post("/add", async (req, res) => {
  const {
    // userId,
    description,
    // category,
    amount,
    date,
    //  paymentMethod
  } = req.body;
  try {
    const newExpense = new Expense({
      //   userId,
      description,
      //   category,
      amount,
      date,
      //   paymentMethod,
    });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/getExpense", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recordId = req.params.id;
    const record = await Expense.findByIdAndDelete(recordId);
    if (!record) return res.status(404).send("No record found");
    res.status(200).send({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Analysis Data
// router.get("/:userId/analysis", async (req, res) => {
//   try {
//     const expenses = await Expense.find({ userId: req.params.userId });
//     const analysis = expenses.reduce((acc, expense) => {
//       acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//       return acc;
//     }, {});
//     res.json(analysis);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

export default router;
