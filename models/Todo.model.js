const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isUrgent: Boolean
}, {
  timestamps: true
})

const TodoModel = mongoose.model("Todo", todoSchema)

module.exports = TodoModel