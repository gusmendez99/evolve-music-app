const db = require("../database");

const GET_MEDIA_TYPES = "SELECT * FROM MediaType";

const getMediaTypes = (request, response) => {
  db.query(GET_MEDIA_TYPES, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};



module.exports = {
  getMediaTypes
};
