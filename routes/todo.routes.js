const router = require("express").Router();
const Todo = require("../models/Todo.model")

// en este archivo haremos todas las rutas de CRUD de todos

// GET "/api/todo" => enviar la lista de Todo, solo los titulos
router.get("/", async (req, res, next) => {
  try {
    const response = await Todo.find().select("title")
    res.json(response)
  } catch (error) {
    next(error)
  }
})

// POST "/api/todo" => crear un nuevo Todo (recibe titulo, descripción y isUrgent)
router.post("/", async (req, res, next) => {

  // console.log(req.body)

  const { title, description, isUrgent } = req.body

  try {
    
    const response = await Todo.create({
      title: title,
      description: description,
      isUrgent: isUrgent
    })

    // res.json(response)
    res.json("todo bien, todo creado")

  } catch (error) {
    next(error)
  }

})

// GET "/api/todo/:todoId" => enviar los detalles de un Todo por su id
router.get("/:todoId", async (req, res, next) => {

  console.log(req.params)
  const { todoId } = req.params;

  try {
    
    const response = await Todo.findById(todoId)
    res.json(response)

  } catch (error) {
    next(error)
  }
})

// DELETE "/api/todo/:todoId" => borrar un Todo por su id
router.delete("/:todoId", async (req, res, next) => {

  const { todoId } = req.params;

  try {
    
    await Todo.findByIdAndDelete(todoId)
    res.json("todo bien, documento borrado")

  } catch (error) {
    next(error)
  }

})

// PATCH "/api/todo/:todoId" => recibir la info de actualización y actualizará un Todo por su id
router.patch("/:todoId", async (req, res, next) => {

  const { todoId } = req.params;
  const { title, description, isUrgent } = req.body;

  try {
    
    await Todo.findByIdAndUpdate(todoId, {
      title,
      description,
      isUrgent
    })

    res.json("todo bien, documento actualizado")

  } catch (error) {
    next(error)
  }

})


module.exports = router;