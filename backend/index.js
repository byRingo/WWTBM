const express = require("express");
const dotenv = require("dotenv");
const testRouter = require("./routes");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const port = process.env.PORT;
const connectionString = process.env.DATABASE_URL;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/students", testRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
