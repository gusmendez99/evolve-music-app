const db = require("../database");

const GET_TRACKS = "SELECT * FROM Track ORDER BY Name ASC";
const GET_TRACK_BY_ID = "SELECT t.*, g.Name as GenreName, m.Name as MediaTypeName, a.Title as AlbumTitle FROM Track t INNER JOIN Genre g on t.genreid = g.genreid INNER JOIN MediaType m on t.mediatypeid = m.mediatypeid INNER JOIN Album a on t.albumid = a.albumid WHERE t.TrackId = $1";
const ADD_TRACK = "INSERT INTO Track (TrackId, Name, Composer, Milliseconds, UnitPrice, Bytes, AlbumId, GenreId, MediaTypeId) SELECT MAX( TrackId ) + 1, $1, $2, $3, $4, $5, $6, $7, $8 FROM Track";
const UPDATE_TRACK = "UPDATE Track SET Name=$1, Composer=$2, Milliseconds=$3, UnitPrice=$4, Bytes=$5, AlbumId=$6, GenreId=$7, MediaTypeId=$8 WHERE TrackId=$9";
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

const createTrack = (request, response) => {
  const { name, composer, milliseconds, unitprice, bytes, albumid, genreid, mediatypeid } = request.body;

  db.query(
    ADD_TRACK,
    [ name, composer, milliseconds, unitprice, bytes, albumid, genreid, mediatypeid ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Track added successfully`);
    }
  );
};

const updateTrack = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, composer, milliseconds, unitprice, bytes, albumid, genreid, mediatypeid } = request.body;

  db.query(
    UPDATE_TRACK,
    [name, composer, milliseconds, unitprice, bytes, albumid, genreid, mediatypeid, id],
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
  createTrack,
  updateTrack,
  deleteTrack
};
