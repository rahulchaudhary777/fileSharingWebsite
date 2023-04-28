import { useRef, useState, useEffect } from 'react';
import './App.css';
import {uploadFile} from './service/api.js'
function App() {

  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const logo = 'https://images.unsplash.com/photo-1480859634854-2acf7a955d43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80';
  
  useEffect(() => {
    const getImage = async () => {
      if(file) {
        const data = new FormData();  
        data.append("name", file.name);
        data.append("file", file);

        const response =  await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }


  return (
      <div className="container">
        <img src={logo} alt="banner"/>
        <div className="wrapper">

          <h1>Share Files to Friends</h1>
          
          <p>upload and share your file and get your file download link.</p>

          <button onClick={() => onUploadClick()}>Upload File</button>

          <input 
            type="file"
            ref={fileInputRef}
            style={{display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <a href={result} target='_blank' rel="noreferrer"> {result} </a> 
        </div>
      </div>
  );
}

export default App;
