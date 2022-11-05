import express, { json } from "express" 
import cors from "cors"

const app = express()
app.use(cors())
app.use(json())

app.post("/sign-up", (req,res)=>{
    const signUp = req.body
    res.send(signUp)
})

app.listen(5000, ()=>{
    console.log('App running on https://localhost:5000')
})