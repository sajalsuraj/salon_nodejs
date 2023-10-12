// Make sure to use the .js extension
import express from "express";
import path from "path";
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { stream } from "./utils/logger.js";
// import sellerRouter from "./routes/sellers.js";

// Use fileURLToPath to get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

var app = express();

app.use(morgan("combined", { stream: stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/sellers", sellerRouter);

export default app;
