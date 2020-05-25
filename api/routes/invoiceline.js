const db = require("../database");
const path = require('path');
const format = require('pg-format');
const { createInvoice } = require("../utils/createInvoice.js");

const ADD_INVOICE_LINE = "INSERT INTO InvoiceLine (InvoiceId, TrackId, UnitPrice, Quantity) VALUES %L RETURNING *";
const createInvoiceLine = (request, response) => { 
    console.log(request.body)
    const { invoiceLines, invoicedata } = request.body;
    

    const invoice = {
      shipping: {
        name: `${invoicedata.firstname} ${invoicedata.lastname}`,
        address: invoicedata.billingaddress,
        city: invoicedata.billingcity,
        state: invoicedata.billingstate,
        country: invoicedata.billingcountry,
        postal_code: invoicedata.billingpostalcode
      },
      items: invoicedata.items,
      subtotal: invoicedata.total,
      paid: 0,
      invoice_nr: 1234
    };

    console.log(invoice)
    
    try {
      createInvoice(invoice, "invoice.pdf");
    } catch(error){
      console.log(error)
    }
    db.query(
      format(ADD_INVOICE_LINE,invoiceLines),
        (error, results) => {
          if (error) {
            throw error;
          }
          console.log(`InvoiceLine added successfully`)
          response.sendFile(path.join(__dirname, '/../invoice.pdf'), (err)=>{
            console.log(err);        
          });
          //response.download()
          //response.status(201).send(`InvoiceLine added successfully`);
        }
    );
};
  
module.exports = {
    createInvoiceLine
}