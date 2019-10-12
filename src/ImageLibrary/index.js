import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import './ImageLibrary.scss';
import { FiTrash2, FiCheckSquare } from "react-icons/fi";

const ImageLibrary = () => {
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ imagesObj, setImagesObj ] = useState(null);
  const [ selectedImgSrc, setSelectedImgSrc ] = useState('');
  const [ messages, setMessages ] = useState({ message: '', isError: false });

  useEffect(() => {
    if (!loading) {
      fetch('/api/images').then(res => res.json()).then(({ response }) => {
        setImagesObj(response);
      });
    }
  }, [loading]);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (selectedFile) {
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
          if (result.errors) {
            setMessages({ message: result.errors.join(', '), isError: true });
          } else {
            setMessages({ message: 'success!', isError: false });
          }
          setLoading(false);
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setMessages({ message: '', isError: false });
  };

  const handleDelete = (objKey) => {
    setLoading(true);
    const jsonObj = JSON.stringify({ key: objKey });
    fetch('/api/images/delete', {
      method: 'POST',
      body: jsonObj
    }).then(res => res.json()).then(({ success }) => {
      setLoading(false);
      setMessages({ message: 'Deleted!', isError: false });
    }).catch(err => {
      setLoading(false);
      setMessages({ message: 'Failed to delete.', isError: true });
      console.log(err);
    });
  };

  return (
    <div className="ImageLibrary">
      <div className="content m-auto w-100 p-3 border border-info shadow rounded">
        <p>Imagine this is a content or editor area...</p>
        {
          selectedImgSrc && (
            <img src={selectedImgSrc} alt={selectedImgSrc} />
          )
        }
      </div>
      <form onSubmit={onHandleSubmit}>
        <div className="form-group ml-3 mb-0 p-2">
          <input
            name="uploadFile"
            type="file"
            onChange={handleFileChange}
          />
          <Button
            className="my-2"
            color="success"
            type="submit"
            disabled={!selectedFile}
          >
            Upload A New Image
          </Button>
        </div>
        {
          messages.message && (
            <div className={`alert ${ messages.isError ? 'alert-warning' : 'alert-success' } m-3`}>{messages.message}</div>
          )
        }
      </form>
      <div className="gridContainer p-2">
        {
          imagesObj && imagesObj.Contents.map(imageObj => {
            const objKey = imageObj.Key;
            const title = objKey.replace(`${imagesObj.Prefix}/`, '');
            const imgSrc = `https://${imagesObj.Name}.s3.eu-west-2.amazonaws.com/${objKey}`;
            return (
              <div key={objKey+imageObj.LastModified} className="gridItem card m-2 shadow">
                <div>
                  <img className="card-img-top" src={imgSrc} alt={objKey} />
                </div>
                <div className="card-body bg-light">
                  <h5 className="card-title">
                    <FiTrash2
                      className="mx-1"
                      color="red"
                      role="button"
                      style={{ cursor: "pointer"}}
                      onClick={() => handleDelete(objKey)}
                    />
                    <FiCheckSquare
                      className="mx-1"
                      color="blue"
                      role="button"
                      style={{ cursor: "pointer"}}
                      onClick={() => setSelectedImgSrc(imgSrc)}
                    />
                  </h5>
                  <p className="card-text">{title}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ImageLibrary;
