import express, { json } from "express" 
import cors from "cors"
import { tweets, users } from "./aux/constants.js"

const app = express()
app.use(cors())
app.use(json())

app.post("/sign-up", (req,res)=>{
    const signUp = req.body
    if (signUp.username==='' || signUp.avatar==='') {
        res.status(400).send('Todos os campos são obrigatórios!')
        return
    }
    users.push(signUp)
    res.send('OK')
})

app.post("/tweets", (req,res)=>{
    const tweet = req.body
    if (tweet.username==='' || tweet.tweet==='') {
        res.status(400).send('Todos os campos são obrigatórios!')
        return
    }
    tweets.push(tweet)
    users.forEach((u,idx)=>{
        if(u.username===tweet.username){
            tweet.avatar=u.avatar
        }
    })

    res.send(tweets)
})

app.get("/tweets", (req,res)=>{
    const initialValue = tweets.length-1
    const finalValue = tweets.length-11
    console.log(tweets, initialValue, finalValue)
    const showTweets = []
    for(let cont=initialValue; cont>finalValue; cont --) {
        if(tweets[cont]===undefined) {}
        else showTweets.push(tweets[cont])
    }
    res.send(showTweets)
})

app.listen(5000, ()=>{
    console.log('App running on https://localhost:5000')
})