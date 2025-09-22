import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import notesRouter from "./controller/notes.js";
import logger from "./config/logger.js";
import { MONGODB_URI } from "./config/config.js";
import middleware from "./utils/middleware.js";

const app = express();

mongoose.set("strictQuery", false);

logger.info("Connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist")); //Necesario para servir el index.html y index.js al desplegarlo
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/v1/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler); // Este debe ser el último middleware cargado

export default app;
