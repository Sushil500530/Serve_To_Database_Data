const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.ruakr2a.mongodb.net/?retryWrites=true&w=majority`;

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
    // app.get("/", async(req, res) => {
    //     try{
    
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Server is Running Now.....');
})

app.listen(port, ()=>{
    console.log(`Server is Running on port ${port}`);
})
