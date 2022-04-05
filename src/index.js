import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import setUpRoutes from "./routes";

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost/studentsdb");

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));

    setUpRoutes(app);

    app.listen(3000);
  } catch (error) {}
};

start();
