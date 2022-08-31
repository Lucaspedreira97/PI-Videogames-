const { Videogame, Genre, Op } = require("../db");
const axios = require("axios");
const api = "https://api.rawg.io/api/games?key=83f2de66524741fa811d3eb2dd2864b7";
const genres = `https://api.rawg.io/api/genres?&key=83f2de66524741fa811d3eb2dd2864b7`;

//GET ALL VIDEOGAMES
const getVideogames = async (req, res) => {
  const { name } = req.query; //si no hay nombre entra al if y si hay nombre se va al else..
  try {
    if (!name) {
      let allGames = [];
      //GET A BASE DE DATOS---------
      const infoDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let gameDb = infoDB.map((games) => {
        //map para que los generos los traiga en array
        return {
          id: games.id,
          name: games.name,
          background_image: games.background_image,
          rating: games.rating,
          genres: games.genres.map((g) => g.name),
          createdInDb: games.createdInDb,
          webSite:games.webSite
        };
      });
      //-----------
      let response = await axios.get(api);
      pages = 0;
      while (pages < 5) {
        pages++;
        let videogames = response.data.results.map((games) => {
          return {
            id: games.id,
            name: games.name,
            background_image: games.background_image,
            rating: games.rating,
            genres: games.genres.map((g) => g.name),
          };
        });
        allGames = [...allGames, ...videogames];
        response = await axios.get(response.data.next); //vuelvo a llamar a la prop next de la API, para concatenar 20 juegos más
      }
      const result = [...gameDb, ...allGames];
      return res.json(result);
    } else {//---------------------------------------------------------------------------------------
      // ACA EMPIEZA EL GET BY NAME
      let gamesSearch = [];
      let response = await axios.get(
        `https://api.rawg.io/api/games?search=${name}?&key=83f2de66524741fa811d3eb2dd2864b7`
      );
      gamesSearch = response.data?.results
        .map((games) => {
          return {
            id: games.id,
            name: games.name,
            background_image: games.background_image,
            rating: games.rating,
            genres: games.genres.map((g) => g.name),
          };
        })
      //aca pido por name a base de datos
      let nameDb = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const resDb = nameDb.map((games)=>{
        return {
          id: games.id,
          name: games.name,
          background_image: games.background_image,
          rating: games.rating,
          genres: games.genres.map((g) => g.name),
          webSite:games.webSite
        };
      })
      let resultado = [...resDb, ...gamesSearch];
      res.send(resultado.slice(0,15));
    }
  } catch (e) {
    console.log(e,"error");
  }
};

//GET DETAIL
const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      let response = await axios.get(
        `https://api.rawg.io/api/games/${id}?&key=83f2de66524741fa811d3eb2dd2864b7`
      );

      let gamefilter = {
        name: response.data?.name,
        background_image: response.data.background_image,
        description: response.data.description_raw,
        released: response.data.released,
        rating: response.data.rating,
        webSite: response.data?.webSite,
        platform: response.data.platforms.map(p => p.platform.name),
        genres: response.data.genres.map((g) => {
          return {
            name: g.name,
          };
        }),
      };
      res.json(gamefilter);
    } else {
      let dbId = await Videogame.findAll({
        where:{ id : id} ,
        include:{
            model: Genre,
            attributes:['name'],
            through: {
                attributes: []
            }
        }
    })
    res.send(dbId)
    }
  } catch (e) {
    console.log(e);
  }
};

//GET GENEROS
const getGenres = async (req, res) => {
  try {
    let response = await axios.get(genres);
    let generos = response.data.results.map((genre) => {
      return genre.name;
    }).toString()
    .trim()
    .split(",");
    generos.forEach((e) => {
      Genre.findOrCreate({
        where: { name: e },
      });
    });
    const db = await Genre.findAll();
    res.json(db);
  } catch (e) {
    console.log(e);
  }
};

// POST VIDEOGAME
const postGame = async (req, res) => {
  const {
    name,
    description,
    reldate,
    rating,
    platform,
    background_image,
    genre,
    webSite
  } = req.body;
  try {
    const newGame = await Videogame.create({
      name: name,
      description: description,
      reldate: reldate,
      rating: rating,
      platform: platform,
      background_image: background_image,
      genre: genre,
      webSite:webSite
      // createdInDb: true
    });
    const genreID = await Genre.findAll({
      where: { name: genre },
      // attributes: ["id"],
    });
    newGame.addGenres(genreID);
    res.send(genreID);
  } catch (e) {
    console.log(e);
  }
};



module.exports = { getVideogames, getDetail, getGenres, postGame };

