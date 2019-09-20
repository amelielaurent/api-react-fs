import React from 'react';
import './App.scss';
import './Ajax.js';
import Tags from './component/Tags';
import flag from './assets/flag_grey.svg';
import share from './assets/share_grey.svg';

function App() {
  return (
    <div className="App">
      <div className="Profile">
        <h4 className="Profile-title"></h4>
        <div className="Profile-action">
          <div className="Profile-help">
            <img src={flag} className="App-picto" alt="flag" />
            <h5>Besoin d'aide</h5>
          </div>
          <div className="Profile-share">
            <img src={share} className="App-picto" alt="share" />
            <h5>Partager un truc intéressant</h5>
          </div>
        </div>
      </div>
      <div className="Tags">
        <h4>Ajoute des Tags pour recevoir plus d'actualités</h4>
        <div className="Tags-container">
          <Tags name="Design" />
          <Tags name="Communication" />
          <Tags name="Developpement" />
          <Tags name="Arts" />
        </div>
        <div className="Tags-container">
          <Tags name="UX Design" />
          <Tags name="Marketing" />
          <Tags name="Graphisme" />
          <Tags name="Wordpress" />
        </div>
      </div>
      <div className="post">
      </div>
    </div>
  );
}

export default App;
