import express from 'express';
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

let blogPosts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs",)
})

app.post("/getJoke", async (req, res) => {
    const jokeData =  await getJoke();
    console.log(jokeData);
    res.render("index.ejs", {joke: jokeData.joke})
})

app.post("/getRiddle", async (req, res) => {
    const riddleData = await getRiddle();
    console.log(riddleData);
    res.render("index.ejs", {
        riddle:riddleData
    })
})

app.listen(port,() =>{
    console.log('Listening on port ' + port);
})

async function getJoke() {
    try {
        const response = await axios.get(`https://geek-jokes.sameerkumar.website/api?format=json`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getRiddle(){
    try{
        const riddle = await axios.get(`https://riddles-api.vercel.app/random`);
        console.log(riddle);
        return riddle.data;
    }catch(err){
        console.error(err);
    }
}