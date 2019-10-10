const express = require("express");
const bodyParser = require ("body-parser");
const port = 3000;
const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.render("index", {title: "Hey", message: "Hello there!"});
});

const movies = [
    { title: "Lord of the Rings", slug:"lotr"},
    { title: "Star Wars", slug: "starwars"}, 
    { title: "Pulp Fiction", slug:"thering"},
    { title: "Coco", slug: "coco"}, 
    { title: "Up", slug: "up"},
    { title: "Finding Nemo", slug: "findingnemo"}
];

app.get("/movies", (req, res) => {
    res.render("movies", {movies: movies});
});

app.get("/movies/:movie", (req, res) => {
    let filteredMovies = movies.filter(movie => {
        return movie.slug === req.params.movie;
    });
    console.log(filteredMovies);
    if (filteredMovies.length < 1){
        res.send("Movie not found");
    }
    res.render("movie", {movie: filteredMovies[0]});
});

app.get("/about/us", function(req, res){
    res.render("about", {title: "Hey", message: "Hello there!"});
});

app.get("/dashboard", (req, res)=>{
    res.render("dashboard");
});

app.get("/login", (req, res) =>{
    res.render("login");
})

app.post("/login", (req, res)=>{
    console.log(req.body);
    res.redirect("/dashboard");
});
app.listen(port, () => {
    console.log(`Port ${port} is running`);
});

