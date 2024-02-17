const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const morgan = require("morgan");
const categoriesRoute = require("./routes/categories");
const authRouter = require("./routes/AuthRouter");
const { errorHandler,notFound } = require("./middleware/errorMiddleware")
dotenv.config();
app.use(express.json());

app.use(morgan("dev"));
app.use(cors());
// For Routing
app.use("/api/categories", categoriesRoute);
app.use("/api/auth", authRouter);
app.use(notFound)
app.use(errorHandler)

// SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
