const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();


//middleware
app.use(cors());
app.use(express.json())



//connect to database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sxdtx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
   try{
       await client.connect()
    //    console.log('connect to database');
       const taskCollection = client.db("toDoList").collection("task");



       //all data load
        app.get('/todos', async(req, res) =>{
            const query ={}
            const cursor = taskCollection.find(query);
            const todos = await cursor.toArray();
            // console.log(cars);
            res.send(todos)
        })

        //delete api
        app.delete('/todo', async(req, res) =>{
            const id = req.params.id;
            console.log(id);
            const query = {_id: ObjectId(id)};
            const result = await taskCollection.deleteOne(query);
            res.send(result)
        })

        //post api
        app.post('/todo', async(req, res) =>{
            const todo = req.body;
            const result = await taskCollection.insertOne(todo);
            res.send(result)
        })

   }
   finally{

   }
}

run().catch(console.dir)






//root api
app.get('/', (req, res)=>{
    res.send('To Do List Server')
})
//for listen
app.listen(port, () =>{
    console.log('To Do list', port);
})