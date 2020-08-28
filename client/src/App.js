import React from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { song: "" };
}

  songUrl() {
    const songPlayer= `https://open.spotify.com/embed/track/${this.state.song}`
    return songPlayer;
}


  callAPI() {
    // fetch("https://spotivibes-front-end.herokuapp.com/song")
    fetch("http://localhost:9000/song")

        .then(res => res.text())
        .then(res => this.setState({ song: res }));
}

  UNSAFE_componentWillMount() {
    this.callAPI();
  }

render() {
  return (


    <div className="App">
    
      <header className="App-header">
      </header>

      <body>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Gaegu&family=MuseoModerno:wght@300&display=swap');
      </style>

        <h1 className="spotivibesHeader">SpotiVibes</h1>
        <h2 className="moodRing">A mood ring for music</h2>



       <div class="wrapper">

          <form method="post" action="http://localhost:9000/keyword" onSubmit={this.onFormSubmit}>
        {/* <form method="post" action="https://spotivibes-front-end.herokuapp.com/keyword" onSubmit={this.onFormSubmit}> */}
    
          <input type="text" className="input" placeholder="Give me a song that makes me feel..." id="keyword" name="keyword" 
          style={{width: '300px'}}/>
          <span className="underline"></span>
          <button className='textButton' type="submit"/>
        </form>

        {/* <form method="post" action="https://spotivibes-front-end.herokuapp.com/image" encType="multipart/form-data"> */}
        <form method="post" action="http://localhost:9000/image" encType="multipart/form-data">
          <input type="file" id="myFile" name="filename" />    
          <button className="button" type="submit"/>
        </form>

        {/* <form class="upload-image-form">
        <p id="upload-image-filepath"></p>
  
        <div class="upload-image btn">
        <span>Upload your photo</span>
        <input class="upload-image-input" type="file"/>
       </div>
  
  <div class="upload-image-confirmation">
    <input class="upload-image-cancel btn" type="reset" value="Cancel"/>
    <input class="upload-image-submit btn" type="submit" value="Ok"/>
  </div>
</form> */}


        </div>
        <div className="spotifyPlayer">
        <iframe src={this.songUrl()} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>


      </body>
    </div>
    
  );
  }
}
export default App;
