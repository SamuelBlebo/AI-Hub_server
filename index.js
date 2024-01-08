require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// cors
const corsOptions = {
  origin: "https://ai-hub-client.vercel.app/",
  credentials: true,
  optionsSuccessStatus: 200,
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/ai", aiRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
