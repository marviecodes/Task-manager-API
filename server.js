require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5050;
const taskRoutes = require("./routes/tasks");
const connectToDb = require("./database/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// express json middleware
app.use(express.json());

// express static middleware
app.use(express.static("./public"));

// form data
app.use(express.urlencoded({ extended: true }));

// Parent route
app.use("/api/v1/tasks", taskRoutes);

// not found middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

// function to ensure db connects before app starts
const start = async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// GET -> /api/v1/tasks = GET ALL THE TASKS
// POST -> /api/v1/tasks = CREATE NEW TASK
// GET -> /api/v1/tasks/:id = GET TASK BY ID
// PATCH -> /api/v1/tasks/:id = UPDATE TASK BY ID
// DELETE -> /api/v1/tasks/:id = DELETE TASK BY ID
