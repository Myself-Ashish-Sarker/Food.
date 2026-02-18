require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongo-app.q62fegx.mongodb.net/?appName=mongo-app`;
const port = process.env.PORT || 5000;

// middlewars
app.use(cors());
app.use(express.json());



// mongodb area

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // collection database
        const userCollection = client.db("foodDB").collection("users");
        await userCollection.createIndex({ email: 1 }, { unique: true });

        // post user api
        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        // get user api & filter role based user api
        app.get("/users", async (req, res) => {
            const role = req.query.role;
            const query = role ? { role } : {};
            const result = await userCollection.find(query).toArray();
            res.send(result);
        });

        // get user specific api
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const user = await userCollection.findOne({ email });
            res.send(user);
        });

        // delete user api
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




// mongodb area


app.get("/", (req, res) => {
    res.send("Food is cooking");
});

app.listen(port, () => {
    console.log("Food is cooking");
})