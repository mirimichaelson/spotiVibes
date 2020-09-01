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
    fetch("https://spotivibes.herokuapp.com/song")
    // fetch("http://localhost:9000/song")

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
        {/* <form method="post" action="https://spotivibes.herokuapp.com/keyword" onSubmit={this.onFormSubmit}> */}
    
          <input type="text" className="input" placeholder="Give me a song that makes me feel..." id="keyword" name="keyword" 
          style={{width: '300px'}}/>
          <span className="underline"></span>
          <button className='textButton' type="submit"/>
        </form>

        <form className="imageForm" method="post" action="https://spotivibes.herokuapp.com/image" encType="multipart/form-data" style={{top: '40px;'}}>
        {/* <form className="imageForm" method="post" action="http://localhost:9000/image" encType="multipart/form-data" style={{top: '40px;'}}> */}
        <input type="file" id="myFile" name="filename" style={{paddingLeft: '60px;'}} />    
          <button className="button" type="submit"/>
        </form>

        </div>
        <div className="spotifyPlayer" id="spotiPlayer">
        <iframe src={this.songUrl()} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>


      </body>
    </div>
    
  );
  }
}
export default App;
