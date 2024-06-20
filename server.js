const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const categoryRotes = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoute");
const cors = require("cors");
//config env
dotenv.config();
connectDB();

const app = express();
//middleware
//earlier we were using body parser but we get new json feature from express here
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
//rest api
app.get("/", (req, res) => {
  res.send({ message: "Welcome to ecommerce website" });
});
//categoryRoute
app.use("/api/v1/category", categoryRotes);
// product route
app.use("/api/v1/product", productRoute);
const Port = process.env.PORT || 8080;
// const Port = 8080;
app.listen(Port, () => {
  console.log(
    `server is running on ${process.env.dev} mode at  ${Port}`.bgCyan.white
  );
});
