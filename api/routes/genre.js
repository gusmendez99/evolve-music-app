const db = require("../database");

const GET_GENRES = "SELECT * FROM Genre ORDER BY Name ASC";
const GET_GENRE_BY_ID = "SELECT * FROM Genre WHERE GenreId = $1";
const ADD_GENRE = "INSERT INTO Genre (GenreId, Name) VALUES ($1, $2)";
const UPDATE_GENRE = "UPDATE Genre SET Name=$1 WHERE GenreID=$2";
const DELETE_GENRE = "DELETE FROM Genre WHERE GenreId = $1";

const getGenres = (request, response) => {
  db.query(GET_GENRES, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getGenreById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_GENRE_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createGenre = (request, response) => {
  const { idGenre, name } = request.body;

  db.query(
    ADD_GENRE,
    [ idGenre, name ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Genre added with ID: ${results.insertId}`);
    }
  );
};

const updateGenre = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  db.query(
    UPDATE_GENRE,
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Genre modified with ID: ${id}`);
    }
  );
};

const deleteGenre = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(DELETE_GENRE, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Genre deleted with ID: ${id}`);
  });
};


module.exports = {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
};
