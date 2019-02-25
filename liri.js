require("dotenv").config();

var moment = require('moment');

var fs = require("fs");

var Spotify = require('node-spotify-api');

var axios = require("axios");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// gets info from spotify api
if (process.argv[2] === 'spotify-this-song') {
  spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    //console.log(JSON.stringify(data));
    // console.log(data.tracks);
    // console.log(data.tracks.items[0]);
    console.log('Song Title: ' + process.argv[3]);
    console.log("---------------------------------------");
    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
    console.log("---------------------------------------");
    console.log('Link to Sample: ' + data.tracks.items[0].album.artists[0].external_urls.spotify);
    console.log("---------------------------------------");
    console.log('Album: ' + data.tracks.items[0].album.name);



  });


}




// axios request from omdb
var searchType = process.argv[2];
var userSearch = process.argv[3];


if (searchType === "movie-this") {
  axios.get("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log('Title: ' + userSearch);
      console.log("---------------------------------------")
      console.log('Release Year: ' + response.data.Year);
      console.log("---------------------------------------")
      console.log('IMDB Rating: ' + response.data.imdbRating);
      console.log("---------------------------------------")
      console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
      console.log("---------------------------------------")
      console.log('Produced In: ' + response.data.Country);
      console.log("---------------------------------------")
      console.log('Language: ' + response.data.Language);
      console.log("---------------------------------------")
      console.log('Plot: ' + response.data.Plot);
      console.log("---------------------------------------")
      console.log('Starring: ' + response.data.Actors);
    }
  );
}

// axios request from bands in town
if (searchType === "concert-this") {
  axios.get("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp").then(function (response) {
    console.log('Venue Name: ' + response.data[0].venue.name);
    console.log('Venue Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region);
    var datetime = moment(response.data[0].venue.datetime).format('MM/DD/YYYY');
    console.log('Concert Date: ' + datetime);
  });
}

if (searchType === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    // console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    // console.log(dataArr);

    var arr0 = dataArr[0];

    var arr1 = dataArr[1];

    // console.log(arr0);

    // console.log(arr1);

    if (arr0 === 'spotify-this-song') {
      spotify.search({ type: 'track', query: arr1, limit: 1 }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }


        console.log('Song Title: ' + arr1);
        console.log("---------------------------------------");
        console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
        console.log("---------------------------------------");
        console.log('Link to Sample: ' + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("---------------------------------------");
        console.log('Album: ' + data.tracks.items[0].album.name);
      });
    }

    if (arr0 === "movie-this") {
      axios.get("http://www.omdbapi.com/?t=" + arr1 + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
          console.log('Title: ' + userSearch);
          console.log("---------------------------------------")
          console.log('Release Year: ' + response.data.Year);
          console.log("---------------------------------------")
          console.log('IMDB Rating: ' + response.data.imdbRating);
          console.log("---------------------------------------")
          console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
          console.log("---------------------------------------")
          console.log('Produced In: ' + response.data.Country);
          console.log("---------------------------------------")
          console.log('Language: ' + response.data.Language);
          console.log("---------------------------------------")
          console.log('Plot: ' + response.data.Plot);
          console.log("---------------------------------------")
          console.log('Starring: ' + response.data.Actors);
        }
      );
    }

    if (arr0 === "concert-this") {
      console.log(arr0);
      console.log(arr1);
      axios.get("https://rest.bandsintown.com/artists/" + arr1 + "/events?app_id=codingbootcamp").then(function (response) {
        console.log('Venue Name: ' + response.data[0].venue.name);
        console.log('Venue Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region);
        var datetime = moment(response.data[0].venue.datetime).format('MM/DD/YYYY');
        console.log('Concert Date: ' + datetime);
      });
    }

  })

  
}