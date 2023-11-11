/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Nirmallo Halder Student ID: 126291210 Date: November 10, 2023
*
*  Published URL: https://joyous-gold-pajamas.cyclic.app
*
********************************************************************************/



const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public')); // set static folder
app.set('view engine', 'ejs');

const HTTP_PORT = process.env.PORT || 8080; // set port

// get "/"


app.get('/', (req, res) => {
  res.render("home", { page: '/' });
});

app.get('/about', (req, res) => {
  res.render("about", { page: '/about' });
});


// get "/lego/sets" to return all sets


app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;

  if (theme) {

    legoData.getSetsByTheme(theme)

      .then((data) => {

        if (data.length === 0) {

          res.status(404).render("404", { message: "No sets found for the specified theme." });

        } else {

          res.json(data);
        }
      })
      .catch((err) => {

        res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for." });
      });


  } else {


    // Handle other cases if needed
  }

});

// get "/lego/sets/:num" to return a set by setNum


app.get('/lego/sets/:num', (req, res) => {
  const setNum = req.params.num;

  legoData.getSetByNum(setNum)
    .then((data) => {
      if (!data) {

        res.status(404).render("404", { message: "No set found for the specified set number." });
      } else {
        res.json(data);
      }

    })
    .catch((err) => {
      res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for." });
    });

});

// 404 error


app.use((req, res) => {


  res.status(404).render("404", { message: "The page you requested does not exist." });

});

// call initialize function in legoData module


legoData.initialize().then(() => {


  app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

})

.catch((err) => {

  console.log(err);
});