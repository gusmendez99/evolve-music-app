const db = require("../database");

const GETINVOICE = "SELECT * FROM usersSales($1, $2)";


const getInvoice = (request, response) => {
  const { initial_date, final_date } = request.body; 
  db.query(GETINVOICE, [initial_date, final_date], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getInvoice,
};
