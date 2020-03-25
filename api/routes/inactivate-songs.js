const db = require("../database");

const GET_INACTIVE_SONGS = "SELECT * FROM InactiveTrack";
const ADD_INACTIVE_SONG = "INSERT INTO InactiveTrack (TrackId) VALUES ($1)";
const GET_INACTIVE_SONG_BY_ID = "SELECT * FROM InactiveTrack WHERE TrackId = $1";
const DELETE_INACTIVE_SONG = "DELETE FROM InactiveTrack WHERE TrackId = $1"

const getInactiveSongs = (request, response) => {
  db.query(GET_INACTIVE_SONGS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const addInactiveSong = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(
    ADD_INACTIVE_SONG,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Inactivated song added with ID: ${id}`);
    }
  );
};

const getInactiveSongById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_INACTIVE_SONG_BY_ID,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    })
};

const deleteInactiveSong = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(DELETE_INACTIVE_SONG,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Inactive song deleted with id: ${id}`);
    }
  )
};

module.exports = {
  getInactiveSongs,
  addInactiveSong,
  getInactiveSongById,
  deleteInactiveSong
};