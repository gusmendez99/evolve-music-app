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

  const usersQuery = await fetch('http://localhost:3000/invoice/users-with-most-purchases',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });
  
  const users = await usersQuery.json();
  const trackRecommendations = [];


  for(let i=0; i<users.length; i++) {
    console.log('User: ', users[i].userid)
    const idUser = users[i].userid;

    const trackQuery = await fetch('http://localhost:3000/track-recommendations',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ idUser })
    });

    const tracks = await trackQuery.json();
    trackRecommendations.push({ _id: users[i].userid, tracks })
  }

  console.log('Passed 1')
  console.log(JSON.stringify(trackRecommendations))

  createListings(listings, trackRecommendations).then(() => response.status(200).send("Ready lo logramos Apollo 13!!!")).catch(error => console.log(error));


}

// main().catch(console.error);

async function createListings(newListings, trackRecommendations) {
  try {

    // Invoice
    await client.connect();
    const resultInvoice = await client.db("evolve1").collection("invoice").insertMany(newListings);
    console.log(`${resultInvoice.insertedCount} new listing(s) created with the following id(s):`);
    console.log(resultInvoice.insertedIds);

    console.log('Passed 2')

    //Recommendations
    await client.db("evolve1").collection("recommendations").deleteMany({}, {})
    const resultRecommendations = await client.db("evolve1").collection("recommendations").insertMany(trackRecommendations)
    console.log(`${resultRecommendations.insertedCount} new listing(s) created with the following id(s):`);
    console.log(resultRecommendations.insertedIds);

    console.log('Passed 3')

  }
  catch (e) {

    console.error(e);

  } finally {

    await client.close();

  }
}

module.exports = {
  main
}