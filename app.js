const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const morgan = require("morgan");
const categoriesRoute = require("./routes/categories");
const authRouter = require("./routes/AuthRouter");

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// For Routing
app.use("/api/categories", categoriesRoute);
app.use("/api/auth", authRouter);
// SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
