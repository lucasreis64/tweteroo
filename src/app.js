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
    res.status(201).send('OK')
})

app.post("/tweets", (req,res)=>{
    const tweet = req.body
    const username = req.headers.user
    if (username==='' || tweet.tweet==='') {
        res.status(400).send('Todos os campos são obrigatórios!')
        return
    }
    tweet.username = username
    console.log(username)
    tweets.push(tweet)
    users.forEach((u,idx)=>{
        if(u.username===tweet.username){
            tweet.avatar=u.avatar
        }
    })
    console.log(tweet)
    res.status(201).send('OK')
})

app.get("/tweets", (req,res)=>{
    
    let page = Number(req.query.page)
    if (page<1){res.status(400).send("Informe uma página válida!"); return}
    page-=1
    const initialValue = (tweets.length-1)-page*10
    const finalValue = (tweets.length-11)-page*10
    const showTweets = []
    for(let cont=initialValue; cont>finalValue; cont --) {
        if(tweets[cont]===undefined) {}
        else showTweets.push(tweets[cont])
    }
    if (showTweets.length===0){res.status(400).send("Informe uma página válida!"); return}
    res.send(showTweets)
})

app.get("/tweets/:user", (req,res)=>{
    const userName = req.params.user

    const tweetsUser = tweets.filter((t,idx)=>t.username===userName)
    if(tweetsUser.length===0) {res.sendStatus(404);return}
    res.send(tweetsUser)
})

app.listen(5000, ()=>{
    console.log('App running on https://localhost:5000')
})