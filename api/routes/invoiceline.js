const db = require("../database");

const ADD_INVOICE_LINE = "INSERT INTO InvoiceLine (InvoiceLineId, InvoiceId, TrackId, UnitPrice, Quantity) SELECT MAX( InvoiceLineId ) + 1, $1, $2, $3, $4 FROM InvoiceLine RETURNING *";

const createInvoiceLine = (request, response) => {
    const {
      invoiceid,
      trackid,
      unitprice,
      quantity,
    } = request.body;
  
    db.query(
      ADD_INVOICE_LINE,
      [
        invoiceid,
        trackid,
        unitprice,
        quantity
      ],
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