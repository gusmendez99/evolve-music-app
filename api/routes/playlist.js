const db = require("../database");



const GET_PLAYLISTS = "SELECT * FROM Playlist ORDER BY Name ASC";
const GET_PLAYLIST_BY_ID = "SELECT * FROM Playlist WHERE PlaylistId = $1";
const ADD_PLAYLIST = "INSERT INTO Playlist (PlaylistId, Name) SELECT MAX( PlaylistId ) + 1, $1 FROM Playlist RETURNING *";
const UPDATE_PLAYLIST = "UPDATE Playlist SET Name=$1 WHERE PlaylistId=$2 RETURNING *";
const DELETE_PLAYLIST = "DELETE FROM Playlist WHERE PlaylistId = $1 RETURNING *";
const UPDATE_LOGBOOK = "SELECT updateLogbook($1,$2,$3,$4)";


const getPlaylists = (request, response) => {
    db.query(GET_PLAYLISTS, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
};

const getPlaylistById = (request, response) => {
    const id = parseInt(request.params.id);
  
    db.query(GET_PLAYLIST_BY_ID, [id], (error, results) => {
      if (error) {
        throw error;
      }    
      response.status(200).json(results.rows)
  
    });
};

const createPlaylist = (request, response) => {
    const { name, userid } = request.body;
  
    db.query(
      ADD_PLAYLIST,
      [ name ],
      (error, results) => {
        if (error) {
          throw error;
        }
        db.query(UPDATE_LOGBOOK,
          [userid,'INSERT',results.rows[0].playlistid, 'PLAYLIST'],
          (error, results) => {
            if (error) {
            throw error;
            } 
          });
        response.status(201).send(`Playlist added with ID: ${results.rows[0].playlistid}`);
      }
    );
};

const updatePlaylist = (request, response) => {
    const id = parseInt(request.params.id);
    const { name,userid } = request.body;
  
    db.query(
      UPDATE_PLAYLIST,
      [name, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        db.query(UPDATE_LOGBOOK,
          [userid,'UPDATE',results.rows[0].playlistid, 'PLAYLIST'],
          (error, results) => {
            if (error) {
            throw error;
            } 
          });
        response.status(200).send(`Playlist updated with ID: ${id}`);
      }
    );
  };

const deletePlaylist = (request, response) => {
  const id = parseInt(request.params.id);
  const { userid } = request.body;

  db.query(DELETE_PLAYLIST, [id], (error, results) => {
    if (error) {
      throw error;
    }
    db.query(UPDATE_LOGBOOK,
      [userid,'DELETE',results.rows[0].playlistid, 'PLAYLIST'],
      (error, results) => {
        if (error) {
        throw error;
        } 
      });
    response.status(200).send(`Playlist deleted with ID: ${id}`);
  });
};


module.exports = {
  getPlaylists,
  getPlaylistById,
  createPlaylist,
  updatePlaylist,
  deletePlaylist
};
