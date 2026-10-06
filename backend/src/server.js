const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Airbnb Backend is running");
});

app.use("/api/properties", propertyRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
});