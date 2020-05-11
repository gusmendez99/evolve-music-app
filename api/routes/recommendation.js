const db = require("../database");

const GET_RECOMMENDATIONS = "SELECT * FROM getTrackRecommendationsByUser($1)";

const getRecommendations = (request, response) => {
  const { idUser } = request.body; 
  db.query(GET_RECOMMENDATIONS, [idUser], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
    getRecommendations
};
