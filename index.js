const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jgak5ty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db('coffeeDB')
    const coffeeCollection = database.collection('coffees')
    
    // Post a single coffee
    app.post('/add-coffee', async (req, res) => {
        const coffee = req.body
        const result = await coffeeCollection.insertOne(coffee)
        res.send(result)
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Connection
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})