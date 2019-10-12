import React from 'react';
import './App.css';
import ImageLibrary from './ImageLibrary';

function App() {
  return (
    <div className="App">
      <div className="container-fluid p-0">
        <div className="jumbotron">
          <h1>Image library MVP</h1>
          <div className="lead">with S3, node/express, and React</div>
        </div>
      </div>
      <div className="container">
        <ImageLibrary />
      </div>
    </div>
  );
}

export default App;
