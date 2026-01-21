const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// CREATE
app.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// READ
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// TEST
app.get("/", (req, res) => {
  res.send("Secure CRUD App is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});