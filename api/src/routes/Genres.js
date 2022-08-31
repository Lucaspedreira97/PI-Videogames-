//Todas las request que llegan a este archivo es porque dicen "http://localhost:3001/temperaments/..."
// El //Temperaments ya esta implicito porque lo pongo en el archivo index y redirijo a este.
const {Router} = require('express')
const {getGenres} = require('../controllers/GetController') 
const router = Router()

//RUTA DE GET Genres
router.get("/", getGenres)


module.exports = router
