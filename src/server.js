require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes")

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`);
  });
};

startServer();