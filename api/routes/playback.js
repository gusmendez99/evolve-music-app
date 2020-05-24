const db = require("../database");

const ADD_PLAYBACK_RECORD = "SELECT addPlaybackRecord($1,$2)";


const createPlaybackRecord = (request, response) => {
  const { idUser, idTrack } = request.body;

  db.query(
    ADD_PLAYBACK_RECORD,
    [ idUser, idTrack ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Track record added with ID: ${results.insertId}`);
    }
  );
};

module.exports = {
  createPlaybackRecord
};
