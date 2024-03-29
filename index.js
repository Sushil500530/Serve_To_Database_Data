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

    const cloudDataCollection = await client.db('cloudDB').collection("clout_datas");
    try {


        //  cloud data for hosting 
        // get method apply
        app.get("/hosting-datas", async (req, res) => {
            try {
                const result = await cloudDataCollection.find().toArray();
                res.send(result)
            }
            catch (error) {
                console.log(error);
            }
        })
        // get category for unique data by category name
        app.get('/hosting-data/:category', async (req, res) => {
            try {
                const category = req.params.category;
                const query = { category: category }
                const result = await hostingsCollection.find(query).toArray();
                res.send(result)
            }
            catch (error) {
                console.log(error);
            }
        })
        //  get data when search only data 
        app.get('/hostings', async (req, res) => {
            try {
                const filter = req.query;
                const query = {
                    category: {
                        $regex: filter.search,
                        $options: 'i'
                    }
                }
                const result = await hostingsCollection.find(query).toArray();
                res.send(result)
            }
            catch (error) {
                console.log(error);
            }
        })




        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is Running Now.....');
})

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
})
