var express = require('express');
var router = express.Router();
var request = require("request");
const fetch = require("node-fetch");
var btoa = require("btoa");
const { RequestHeaderFieldsTooLarge } = require('http-errors');



const clientID = "040d08f49da545b9b0e32795e0dd8372";
const clientSecret = "dc95f53d92534300adcec5a4fefe089f";

async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = global.keyword;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;
  const magnitude = sentiment.magnitude.toFixed(2);

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${magnitude}`);

  const valence = (sentiment.score + 1) / 2
  const finalValence = valence.toFixed(2);

  console.log(`Valence score: ${finalValence}`);
}


function getRandomNumber() {  
  return Math.floor(
    Math.random() * (5 - 1 + 1) + 1

  )
}


getToken = async () => {

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  return data.access_token;

};

getListOfGenreSongs = async (token, valence, magnitude) => {
  spotifytoken = await token;
  finalValence = await valence;
  keywordMagnitude = await magnitude;
  const result = await fetch(`https://api.spotify.com/v1/recommendations?limit=100&market=GB&seed_genres=jazz&min_popularity=50&target_valence=${finalValence}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + spotifytoken }
  });
  const data = await result.json();
  return data.playlists.items[0].id;

};