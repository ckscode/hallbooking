import express from 'express';
import cors from 'cors'
import router from './Routers/Routers.js';
const app = express();
const PORT = 4000
app.use(cors());
app.use(express.json());

app.use('/api',router)

app.get('/',(req,res)=>{
    res.status(200).send('<h1 style=font-size:40px;font-family:Arial,Helvetica,sans-serif;>Welcome to Hall booking App</h1>')
})

app.listen(PORT,()=>{
    console.log('app is listening')
})