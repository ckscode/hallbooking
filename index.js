import express from 'express';
import cors from 'cors'
import router from './Routers/routers.js';
const app = express();
const PORT = 4000
app.use(cors());
app.use(express.json());

app.use('/api',router)

app.get('/',(req,res)=>{
    console.log(new Date("2024/05/25 01:10 PM").toLocaleTimeString()>new Date("2024/05/25 02:10 PM").toLocaleTimeString())
    res.status(200).send('app is running successfully')
})

app.listen(PORT,()=>{
    console.log('app is listening')
})