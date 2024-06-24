const express=require('express')
const app=express()
const cors = require('cors');
const mongoose=require('mongoose')
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

app.use(cors())
dotenv.config();
app.use(express.json());
app.use('/', authRoutes);

//aumento dimensione payload:
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const connessioneDb= async()=>{
    try{
        await mongoose.connect(process.env.DBURI);
        console.log("db ok")
    }catch(err){
        console.log("errore connessione al db")
    }
}

app.listen(3000, () => {
    console.log("Server ok");
    connessioneDb()
});