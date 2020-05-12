const db = require("../database");
const format = require('pg-format');

const ADD_INVOICE_LINE = "INSERT INTO InvoiceLine (InvoiceId, TrackId, UnitPrice, Quantity) VALUES %L RETURNING *";
const createInvoiceLine = (request, response) => { 
    const invoiceLines = request.body;
    db.query(
      format(ADD_INVOICE_LINE,invoiceLines),
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).send(`InvoiceLine added successfully`);
        }
    );
};
  
module.exports = {
    createInvoiceLine
}