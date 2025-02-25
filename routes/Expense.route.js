import express from "express";
import Expense from "../models/Expense.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add an Expense (User-Specific)
router.post("/add", authMiddleware, async (req, res) => {
  const { description, amount, date } = req.body;
  const userId = req.user.id; // Extract userID from authenticated user

  try {
    const newExpense = new Expense({
      userId,
      description,
      amount,
      date,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve User-Specific Expenses
router.get("/getExpense", authMiddleware, async (req, res) => {
  const userId = req.user.id; // Extract userID from authenticated user

  try {
    const expenses = await Expense.find({ userId }); // Fetch expenses only for the logged-in user
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete an Expense (User-Specific)
router.delete("/:id", authMiddleware, async (req, res) => {
  const userId = req.user.id; // Extract userID from authenticated user
  const recordId = req.params.id;

  try {
    const record = await Expense.findOneAndDelete({ _id: recordId, userId }); // Ensure the user owns the record

    if (!record) return res.status(404).send("No record found or unauthorized");

    res.status(200).send({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Analysis Data (User-Specific)
router.get("/:userId/analysis", authMiddleware, async (req, res) => {
  const userId = req.user.id; // Ensure user only fetches their own analysis

  try {
    const expenses = await Expense.find({ userId });

    const analysis = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    res.json(analysis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Test Protected Route
router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "Protected Expense Data", userId: req.user.id });
});

export default router;
