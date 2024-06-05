import express from "express";
import message from "./model/messaggiDB.mjs"; // modello dei messaggi
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors"

const pusher = new Pusher({
    appId: "1812335",
    key: "29ad70d39a06d2b41e06",
    secret: "f2e2a3f72d751c118e1d",
    cluster: "eu",
    useTLS: true
  });


const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use(cors());


//connessione con il server
const connectionDBUrl = "mongodb+srv://giuseppemontaruli76:TSkHyRoG5Mn9XZG7@progettoweb.o1bvbby.mongodb.net/?retryWrites=true&w=majority&appName=progettoWeb";

mongoose.connect(connectionDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connessione avvenuta con successo'))
    .catch((err) => console.error(err));

    // change stream
const db = mongoose.connection;
db.once("open" , function (){       //prendiamo una connessione quando è open
    console.log("connessoooooo");

    const msgCollection =db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on("change",(change)=>{
        console.log(change);
        if(change.operationType =="insert"){
            const record = change.fullDocument;
            pusher.trigger('messages', 'inserted', {  //creo un canale e un'evento
                'name' : "nameee",
                'message' : record.message
              });  //trigger che scatena l'evento pusher

        }else{console.log("nessun pusher")}

       
});  
});

app.get('/api', (req, res) => {
    res.status(200).send("Benvenuti sul server")
});



app.get("/api/v1/messages/sync", async (req, res) => {
    try {
        const data = await message.find();
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.post("/api/v1/messages", async (req, res) => {
    const messaggiDB = req.body;

    try {
        const data = await message.create(messaggiDB);
        res.status(201).send(data);  //201 perchè creo una risorsa sul server
    } catch (err) {
        res.status(500).send(err);
    }
});




app.listen(port, () => { console.log(`Server start on port: ${port}`) });
