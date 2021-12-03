const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const orderRoutes = require("./routes/orderRoutes.js")
const cors = require("cors")

dotenv.config();
const app = express();


const mongoose = require("mongoose");
const {notFound, errorHandler} = require("./middleware/errorMiddleware.js");
mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((conn) => console.log("mongoose running", conn.connection.host))
  .catch((err) => console.log("mongoose ERROR", err));

app.use(express.json({extended : true}))
app.use(cors())

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on ${PORT}`));
