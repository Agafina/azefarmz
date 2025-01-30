const express = require("express");
const cors = require("cors");
const i18n = require("i18n");
const { ConnectDB } = require("./configs/db.js");
const corsOptions = require("./configs/cors.js");
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const orderRouter = require("./routes/orderRouter.js");
const adminRouter = require("./routes/adminRoutes.js");

require("dotenv").config();

//require loggings
const { logger } = require("./middlewares/logEvents.js");
const { errorHandler } = require("./middlewares/errorHandler.js");

// i18n setup
i18n.configure({
  locales: ['en', 'fr', 'de'], // Example: English, French, and German
  directory: __dirname + '/locales', // This is where translation files will be stored
  defaultLocale: 'en', // Default language
  queryParameter: 'lang', // Allows you to change the language via URL query (e.g., ?lang=fr)
  autoReload: true, // Automatically reloads translation files
  syncFiles: true, // Synchronize translation files
});

// app configs
const app = express();

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(logger);
app.use(errorHandler);


// Initialize i18n
app.use(i18n.init);

//Database Connection
ConnectDB();

app.use("/api/products", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send(res.__("Hello there"));
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port ", process.env.PORT);
});