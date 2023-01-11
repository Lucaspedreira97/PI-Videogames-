const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerAllGames = require("./Videogames");
const routerAllGenres = require("./Genres");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//MIDLEWEARE
router.use("/videogames", routerAllGames)
router.use("/genres", routerAllGenres)



module.exports = router;
