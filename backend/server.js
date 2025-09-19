import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoute from "./Routes/contactRoute.js";

const app = express();

const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json("API Working"));
app.use("/contacts", contactRoute);

app.listen(port, () => console.log("Server running"));
