import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

// App configuration
const app = express();
const port = 4000;
// Middleware configuration
app.use(express.json());
app.use(cors());
// db connection configuration
connectDB();
// API endpoint configuration
app.use("/api/food", foodRouter);
// Images Serving
app.use("/images", express.static("uploads"));
// user Login
app.use("/api/user", userRouter);
// cart Router
app.use("/api/cart", cartRouter);
// order Router
app.use("/api/order", orderRouter);
app.get("/", (req, res) => {
  res.send("API Working");
});
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
