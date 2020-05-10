const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch');
const uri = "mongodb+srv://user1:12345@mycluster-gr3gp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main(request, response) {

  const { initial_date, final_date } = request.body;

  const result = await fetch('http://localhost:3000/invoice',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ initial_date, final_date })
    });

  const listings = await result.json();

  createListings(listings).then(() => response.status(200).send("Ready lo logramos Apollo 13!!!")).catch(error => console.log(error));

  
  

}

// main().catch(console.error);

async function createListings(newListings) {
  try {

    await client.connect();
    const result = await client.db("evolve1").collection("invoice").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
  }
  catch (e) {

    console.error(e);

  } finally {

    await client.close();

  }
}


module.exports = {
  main,
};