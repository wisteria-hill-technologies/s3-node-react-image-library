import React, { useState } from 'react';
import './App.css';

function App() {
  const [ selectedFile, setSelectedFile ] = useState(null);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    // const formTarget = e.target;
    // const file = formTarget.uploadFile.files[0];
    // get file from either from the form element or from react state
    // console.log('file>>>', file);
    console.log('selectedFile>>>', selectedFile);

    const formData = new FormData();
    formData.append("uploadFile", selectedFile);
    fetch('/api/upload', {
      method: 'POST',
      headers: {
        'enctype': 'multipart/form-data'
      },
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        console.log('result>>>', result);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="App">
      <h1>POC Image library with S3, node/express, and React</h1>
      <form onSubmit={onHandleSubmit}>
        <input
          name="uploadFile"
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
