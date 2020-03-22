const db = require("../database");

const GET_ARTISTS = "SELECT * FROM Artist ORDER BY Name ASC";
const GET_ARTIST_BY_ID = "SELECT * FROM Artist WHERE ArtistId = $1";
const ADD_ARTIST = "INSERT INTO Artist (ArtistId, Name) SELECT MAX( ArtistId ) + 1, $1 FROM Artist";
const UPDATE_ARTIST = "UPDATE Artist SET Name=$1 WHERE ArtistID=$2";
const DELETE_ARTIST = "DELETE FROM Artist WHERE ArtistId = $1";

const getArtists = (request, response) => {
  db.query(GET_ARTISTS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getArtistById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_ARTIST_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createArtist = (request, response) => {
  const { name } = request.body;

  db.query(
    ADD_ARTIST,
    [ name ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Artist added with ID: ${results.insertId}`);
    }
  );
};

const updateArtist = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  db.query(
    UPDATE_ARTIST,
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Artist modified with ID: ${id}`);
    }
  );
};

const deleteArtist = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(DELETE_ARTIST, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Artist deleted with ID: ${id}`);
  });
};


module.exports = {
  getArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist
};
