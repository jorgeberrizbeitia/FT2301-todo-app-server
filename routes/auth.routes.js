const router = require("express").Router();
const User = require("../models/User.model.js")

const bcrypt = require('bcryptjs');

// POST "/api/auth/signup" => Registrar el usuario en la base de datos
router.post("/signup", async (req, res, next) => {

  console.log(req.body)
  const { email, password } = req.body

  // 1. Validaciones de Backed
  // - Validar que los campos no esten vacios
  if (!email || !password) {
    res.status(400).json({ errorMessage: "Los campos deben estar llenos" })
    return; // para detener la funcion, detener la ruta
  }

  // - Validar que la contraseña sea suficientemente fuerte
  // - Validar que el correo electronico tenga el formato correcto
  // - Validar que el usuario no este duplicado
  // esperamos que hagan todas las validaciones de backend :)


  try {

    // encriptar la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    console.log(hashPassword)
    
    // crear el documento de usuario en la BD
    await User.create({
      email: email,
      password: hashPassword
    })

    // test
    res.status(201).json()
    
  } catch (error) {
    next(error)
  }
})


// POST "/api/auth/login" => Validar las credenciales del usuario
router.post("/login", async (req, res, next) => {
  
  const { email, password } = req.body
  console.log(email, password)

  // validacion de que los campos no vengan vacios (hacerla cada uno :))

  try {

    // verificar que el usuario exista en la BD
    const foundUser = await User.findOne({ email: email })
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Credenciales no validas" })
      return;
    }

    // validar si la contraseña es la correcta
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Credenciales no validas" })
      return;
    }
    
    // aqui ya hemos validado las credenciales del usuario
    // aqui hariamos nuestro sistema de sesiones

    res.json("todo bien probando")

  } catch (error) {
    next(error)
  }

})

// GET "/api/auth/verify" => verificar si el usuario está activo o no



module.exports = router;