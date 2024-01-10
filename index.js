require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const aiRoutes = require("./routes/aiRoutes");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const corsOptions = {
  origin: ["http://localhost:3000", "https://ai-hub-client.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, //
};

app.use(cors(corsOptions));

// routes
app.use("/api/ai", aiRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
