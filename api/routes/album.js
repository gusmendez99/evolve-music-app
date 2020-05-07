const db = require("../database");

const GET_ALBUMS = "SELECT * FROM Album  ORDER BY Title ASC";
const GET_ALBUM_BY_ID = "SELECT al.*, art.Name AS ArtistName FROM Album al NATURAL JOIN Artist art WHERE al.AlbumId = $1";
const ADD_ALBUM = "INSERT INTO Album (AlbumId, Title, ArtistId) SELECT MAX( AlbumId ) + 1, $1, $2 FROM Album RETURNING *";
const UPDATE_ALBUM = "UPDATE Album SET Title=$1, ArtistId=$2 WHERE AlbumID=$3 RETURNING *";
const DELETE_ALBUM = "DELETE FROM Album WHERE AlbumId = $1 RETURNING *";
const UPDATE_LOGBOOK = "SELECT updateLogbook($1,$2,$3,$4)";

const getAlbums = (request, response) => {
  db.query(GET_ALBUMS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAlbumById = (request, response) => {
  const id = parseInt(request.params.id);

  db.query(GET_ALBUM_BY_ID, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createAlbum = (request, response) => {
  const { title, artistid, userid } = request.body;

  db.query(
    ADD_ALBUM,
    [ title, artistid ],
    (error, results) => {
      if (error) {
        throw error;
      }
      db.query(UPDATE_LOGBOOK,
        [userid,'INSERT',results.rows[0].albumid, 'ALBUM'],
        (error, results) => {
          if (error) {
          throw error;
          } 
          
        });
        response.status(201).send(`Album added with ID: ${results.rows[0].albumid}`);
    }
  );
};

const updateAlbum = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, artistid, userid } = request.body;

  db.query(
    UPDATE_ALBUM,
    [title, artistid, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      db.query(UPDATE_LOGBOOK,
        [userid,'UPDATE',results.rows[0].albumid, 'ALBUM'],
        (error, results) => {
          if (error) {
          throw error;
          } 
          
        });
      response.status(200).send(`Album modified with ID: ${id}`);
    }
  );
};

const deleteAlbum = (request, response) => {
  const id = parseInt(request.params.id);

  const { userid } = request.body;

  db.query(DELETE_ALBUM, [id], (error, results) => {
    if (error) {
      throw error;
    }
    db.query(UPDATE_LOGBOOK,
      [userid,'DELETE',results.rows[0].albumid, 'ALBUM'],
      (error, results) => {
        if (error) {
        throw error;
        } 
      });
    response.status(200).send(`Album deleted with ID: ${id}`);
  });
};


module.exports = {
  getAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
};
