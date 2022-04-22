const express = require("express");
const app = express();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
//use middleware
app.use(cors());
app.use(express.json());

//user: dbuser2
//pass: wtVjuNQ1Et2nkT0K

const uri =
  "mongodb+srv://dbuser2:wtVjuNQ1Et2nkT0K@cluster0.jc8f0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nkc9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const useCollection = client.db("foodExpress").collection("user");
    // const user = { name: "Nasir369", email: "nasiruddin@gmail.com" };
    // const result = await useCollection.insertOne(user);
    // console.log(`user unique id ${result.insertedId}`);

    //get to browser //mongodb server to client side browser dakbe.
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = useCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //post user:new user create.
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await useCollection.insertOne(newUser);
      res.send(result);
    });

    //get user update
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await useCollection.findOne(query);
      res.send(result);
    });

    //put update user

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateUser.name,
          email: updateUser.email,
        },

      };
      const result=await useCollection.updateOne(filter,updateDoc,option);
      res.send(result);
    });

    //user delete
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await useCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close(); akbar er jono use hba bar bar kaj korle use kora jabe na
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My Server Is Running");
});

app.listen(port, () => {
  console.log("CRUD Server Running", port);
});
