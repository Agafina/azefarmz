const express = require("express");
const cors = require("cors");
const { ConnectDB } = require("./configs/db.js");
const corsOptions = require("./configs/cors.js");
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const orderRouter = require("./routes/orderRouter.js");

require("dotenv").config();

//require loggings
const { logger } = require("./middlewares/logEvents.js");
const { errorHandler } = require("./middlewares/errorHandler.js");

// app configs
const app = express();

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(logger);
app.use(errorHandler);

ConnectDB();

app.use("/api/products", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port ", process.env.PORT);
});
