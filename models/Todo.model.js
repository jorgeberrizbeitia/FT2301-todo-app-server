const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isUrgent: Boolean,
  // ejemplo de relacion usando el req.payload => ver ruta crear Todo
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
})

const TodoModel = mongoose.model("Todo", todoSchema)

module.exports = TodoModel