const db = require("../database");

const GET_INVOICE = "SELECT * FROM usersSales($1, $2)";
const GET_USERS_WITH_MORE_PURCHASED_SONGS = "SELECT au.userid, count(*) from invoiceline il inner join invoice i on il.invoiceid = i.invoiceid inner join appuser au on au.userid = i.userid group by au.userid order by count(*) desc limit 10;"
const ADD_INVOICE = "INSERT INTO Invoice (InvoiceId, UserId, InvoiceDate, BillingAddress, BillingCity, BillingState, BillingCountry,BillingPostalCode, Total) SELECT MAX( InvoiceId ) + 1, $1, $2, $3, $4, $5, $6, $7, $8 FROM Invoice RETURNING *";


const getInvoice = (request, response) => {
  const { initial_date, final_date } = request.body; 
  db.query(GET_INVOICE, [initial_date, final_date], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUsersWithMorePurchasedSongs = (request, response) => {
  db.query(GET_USERS_WITH_MORE_PURCHASED_SONGS, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createInvoice = (request, response) => {
  const {
    userid,
    invoicedate,
    billingaddress,
    billingcity,
    billingstate,
    billingcountry,
    billingpostalcode,
    total
  } = request.body;

  db.query(
    ADD_INVOICE,
    [
      userid,
      invoicedate,
      billingaddress,
      billingcity,
      billingstate,
      billingcountry,
      billingpostalcode,
      total
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({invoiceid: results.rows[0].invoiceid});
    }
  );
};



module.exports = {
  getInvoice,
  getUsersWithMorePurchasedSongs,
  createInvoice,
};
