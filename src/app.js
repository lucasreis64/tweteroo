import express, { json } from "express" 
import cors from "cors"
import { tweets, users } from "./aux/constants.js"

const app = express()
app.use(cors())
app.use(json())

app.post("/sign-up", (req,res)=>{
    const signUp = req.body
    users.push(signUp)
    res.send('OK')
})

app.post("/tweets", (req,res)=>{
    const tweet = req.body
    tweets.push(tweet)
    users.forEach((u,idx)=>{
        if(u.username===tweet.username){
            tweet.avatar=u.avatar
        }
    })

    res.send(tweets)
})

app.listen(5000, ()=>{
    console.log('App running on https://localhost:5000')
})