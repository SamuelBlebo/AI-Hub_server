require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const aiRoutes = require("./routes/aiRoutes");

// express app
app = express();

// cors
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // access-control-allow-credentials:true
  optionsSuccessStatus: 200, // Corrected property name
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

//Conncet to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(`listening on port , ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
