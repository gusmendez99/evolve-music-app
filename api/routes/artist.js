const db = require("../database");



const GET_ARTISTS = "SELECT * FROM Artist ORDER BY Name ASC";
const GET_ARTIST_BY_ID = "SELECT * FROM Artist WHERE ArtistId = $1";
const ADD_ARTIST = "INSERT INTO Artist (ArtistId, Name) SELECT MAX( ArtistId ) + 1, $1 FROM Artist RETURNING *";
const UPDATE_ARTIST = "UPDATE Artist SET Name=$1 WHERE ArtistID=$2 RETURNING *";
const DELETE_ARTIST = "DELETE FROM Artist WHERE ArtistId = $1 RETURNING *";
const UPDATE_LOGBOOK = "SELECT updateLogbook($1,$2,$3,$4)";

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
    response.status(200).json(results.rows)

  });
};

const createArtist = (request, response) => {
  const { name, userid } = request.body;

  db.query(
    ADD_ARTIST,
    [ name ],
    (error, results) => {
      if (error) {
        throw error;
      }
      db.query(UPDATE_LOGBOOK,
        [userid,'INSERT',results.rows[0].artistid, 'ARTIST'],
        (error, results) => {
          if (error) {
          throw error;
          } 
        });
      response.status(201).send(`Artist added with ID: ${results.rows[0].artistid}`);
    }
  );
};

const updateArtist = (request, response) => {
  const id = parseInt(request.params.id);
  const { name,userid } = request.body;

  db.query(
    UPDATE_ARTIST,
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      db.query(UPDATE_LOGBOOK,
        [userid,'UPDATE',results.rows[0].artistid, 'ARTIST'],
        (error, results) => {
          if (error) {
          throw error;
          } 
        });
      response.status(200).send(`Artist modified with ID: ${id}`);
    }
  );
};

const deleteArtist = (request, response) => {
  const id = parseInt(request.params.id);
  const { userid } = request.body;

  db.query(DELETE_ARTIST, [id], (error, results) => {
    if (error) {
      throw error;
    }
    db.query(UPDATE_LOGBOOK,
      [userid,'DELETE', id, 'ARTIST'],
      (error, results) => {
        if (error) {
        throw error;
        } 
      });
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
