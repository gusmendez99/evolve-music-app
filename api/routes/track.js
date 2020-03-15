const db = require("../database");

const GET_TRACKS = "SELECT * FROM Track ORDER BY Name ASC";
const GET_TRACK_BY_ID = "SELECT * FROM Track WHERE TrackId = $1";
//const ADD_TRACK = "INSERT INTO Track (TrackId, Name) VALUES ($1, $2)";
const UPDATE_TRACK = "UPDATE Track SET Name=$1, AlbumId=$2, MediaTypeId=$3, GenreId=$4, Composer=$5, Millisecons=$6, Bytes=$7, UnitPrice=$8 WHERE TrackId=$9";
const DELETE_TRACK = "DELETE FROM Track WHERE TrackId = $1";

const getTracks = (request, response) => {
  db.query(GET_TRACKS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTrackById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_TRACK_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


//TODO: Make logic to create a Track
/* const createTrack = (request, response) => {
  const { idTrack, name } = request.body;

  db.db.query(
    ADD_TRACK,
    [ idTrack, name ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Track added with ID: ${results.insertId}`);
    }
  );
}; */

const updateTrack = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  db.query(
    UPDATE_TRACK,
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Track modified with ID: ${id}`);
    }
  );
};

const deleteTrack = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(DELETE_TRACK, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Track deleted with ID: ${id}`);
  });
};


module.exports = {
  getTracks,
  getTrackById,
//  createTrack,
  updateTrack,
  deleteTrack
};
