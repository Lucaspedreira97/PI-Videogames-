const router = require("express").Router();
const {getVideogames, getDetail, postGame} = require('../controllers/GetController') 


//GET ALL&NAME

router.get("/", getVideogames)

//GET ID 

router.get("/:id", getDetail)

//POST

router.post("/create", postGame)


module.exports = router;




