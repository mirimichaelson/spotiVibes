# spotiVibes

## Project Overview:

Feeling glum but want to feel ecstatic?
In good spirits but would rather chill out?
Simply type in your desired disposition, or better yet upload a selfie, and our app will find you the perfect song.

Team spotiVibes brings you a mood ring for music...

Find the app here: [spotiVibes](http://spotivibes.surge.sh/)


## Thought Process:

This is an app which returns a song from Spotify based on an emotional input. 

A user can input either a word or an image into the app which will connect to the Spotify API to return a song in that same vein of feeling. 

To achieve this, we worked with the Google Cloud Vision API & Google Cloud Natural Language API to find the sentiment in either a face or a word. 

The sentiment score is fed into our Spotify API call, where we conduct our search primarily using:
- genre
- interpolating the sentiment score into the Spotify queries target danceability, target energy & target valence. 

[process-flow-chart](./thought-process.jpg?raw=true)


## Contributors:

- [Miri Michaelson](https://github.com/mirimichaelson)
- [Joshua Ng](https://github.com/JoshuaNg2332)
- [James Forster](https://github.com/jamesAforster)
- [Alessa Hardwick](https://github.com/alessa-lou)

Installation and Setup:
=======================

- Clone this repository with ```git clone https://github.com/mirimichaelson/spotiVibes.git```
- Change into the folder with ```cd spotiVibes```
- Install all dependencies with ```npm install```
- Change into api folder with ```cd api```
- Install all dependencies with ```npm install```
- Move back to root folder with ```cd ..```
- Change into client folder with ```cd api```
- Install all dependencies with ```npm install```
- Move back to root folder with ```cd ..```

## How to run the App locally:

- Start the local server in both the api and client folders with ```npm start```

## Technologies:

* Main technologies:

  - [React](https://reactjs.org/)
  - [Node](https://nodejs.org/en/)
  - [Express](https://expressjs.com)

* External APIs:

  - [Spotify](https://developer.spotify.com/documentation/web-api/)
  - [Google Cloud Vision](https://cloud.google.com/vision)
  - [Google Cloud Language](https://cloud.google.com/natural-language)

* Testing framework:

  - [Jest](https://jestjs.io)
