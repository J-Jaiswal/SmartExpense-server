import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/Expense.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/User.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";

dotenv.config();
const app = express();
connectDB();
// Middleware
// app.use(cors());

app.use(
  cors({
    origin: "https://smart-expense-client.vercel.app", // Allow frontend
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Root Route
app.get("/", (req, res) => {
  res.send({ message: "Server is running!!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/expense", authMiddleware, expenseRoutes);

export default app;
