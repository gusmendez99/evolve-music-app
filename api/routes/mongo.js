const db = require("../database");
const MongoClient = require('mongodb').MongoClient;

//constants
const GETINVOICE = "SELECT * FROM invoice WHERE invoicedate between $1 and $2";



async function main() {


  const uri = "mongodb+srv://user1:12345@mycluster-gr3gp.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true});


  try {

    await client.connect();
    
    const firsDate = '2010-01-01';
    const lastDate = '2011-01-01';

    let result = new Promise((resolve, reject) => 
    db.query(GETINVOICE, [firsDate, lastDate], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    })); 

    const resp =  result.then(res => {
      console.log(res.rows);
    });
    
    createListings(client, res.rows)

    //aquí todo el cachimbasal de código funciones etc ....

  } catch (e) {

    console.error(e);

  } finally {

    await client.close();

  }

}

main().catch(console.err);

async function createListings(client, newListings){

  const result = await client.db("evolve1").collection("invoice").insertMany(newListings);
  console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
  console.log(result.insertedIds);
}
