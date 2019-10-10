const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const index = express();

index.use(express.static("public"));
index.set("view engine", "pug");
index.use(bodyParser.urlencoded({extended: false}));

index.get("/", (req, res)=> {
    res.render("index", {title: "Hey", message: "Hello there!"});
});
const menus = [
    { title: "Lord of the Rings", slug: "lotr" },
    { title: "Star Wars", slug: "starwars" },
    { title: "Pulp Fiction", slug: "pulpfiction" },
    { title: "The Ring", slug: "thering" },
    { title: "Coco", slug: "coco" },
    { title: "Up", slug: "up" },
    { title: "Finding Nemo", slug: "findingnemo" }
  ];
  
  index.get("/menus", function(req, res) {
    res.render("menus", { menus: menus });
  });
  
  index.get("/menus/:menu", function(req, res) {
    let filteredMenus= menus.filter(menu => {
      return menu.slug === req.params.menu;
    });
    console.log(filteredMenus);
    if (filteredMenus.length < 1) {
      res.send("Menu not found");
    }
    res.render("menu", { menu: filteredMenus[0] });
  });
  
  index.get("/about/us", function(req, res) {
    res.render("about", { title: "Hey", message: "Hello there!" });
  });
  
  index.get("/dashboard", function(req, res) {
    res.render("dashboard");
  });
  
  index.get("/login", function(req, res) {
    res.render("login");
  });
  
  index.post("/login", function(req, res) {
    console.log(req.body);
    // check if user's email and password are valid
    // save login state for browser
    res.redirect("/dashboard");
  });

index.listen(PORT, ()=>{
    console.log(`Port ${PORT} is running`);
});
