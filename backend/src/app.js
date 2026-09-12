const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const rfqRoutes = require("./routes/rfq.routes");
const quotationRoutes = require("./routes/quotation.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "RFQ Marketplace API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rfqs", rfqRoutes);
app.use("/api", quotationRoutes);

module.exports = app;