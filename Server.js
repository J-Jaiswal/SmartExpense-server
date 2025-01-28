import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/Expense.route.js";
// import userRoutes from "./routes/user.js";

// Initialize App
dotenv.config();
const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server is running!!" });
});

// Routes
app.use("/api/expense", expenseRoutes);
// app.use("/api/users", userRoutes);

// Listen on Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
