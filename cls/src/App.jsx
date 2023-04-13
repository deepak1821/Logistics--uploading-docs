import React,{useState , useRef} from "react";
import './App.css';

import API_URL from './config.js';
import JsonDisplay from './JsonDisplay.jsx';


function App(){
  // setting the state for File/Image
  const [image,setImage] = useState(null);
  //setting the state for loader and Sucess case
  const [loader ,setLoader] = useState(false);
  const [success, setSuccess] = useState(false);

  const [output , setOutput] = useState();


  //state created for rendering Image
  const [imageDisplay, setImageDisplay]  =useState(null);

  //adding the ref to the input file
  const inputFileRef = useRef(null);

  // constructor to handle the change after selecting the File
  const handleFileChange =(e)=>{
    setImage(e.target.files[0]);
    setImageDisplay(URL.createObjectURL(e.target.files[0]));
  };



  // constructor to handle the change after clickingon upload button\
  const handleUpload =async (e)=>{
    e.preventDefault();

    if(image !== null){



    //clearing the input file value using ref
    inputFileRef.current.value = null;



    setLoader(true);
    setSuccess(false);

    // using the FormData to bundle the data collected from frontend
    const formData = new FormData();
    formData.append('image',image);

    // sending the data to backend using POST and fetch
    const response = await fetch(API_URL,{
      method : 'POST',
      body: formData
    });

    const result = await response.json().then((result)=>{
      setOutput(result);
      setLoader(false)
      setSuccess(true);
      setImage(null);
    });
  }
  else{
    setSuccess(true);
    setOutput({message: 'Please select the image'});
  }
  }
  return(
    <div className="form-style">
      <h1 id="app_heading">Upload Documents</h1>
      <form>


      <div className="comp-font">
      <label>Enter your Aadhar Id</label>&ensp;
      <input type='number'></input>
       <br></br><br></br>


      <div>
      <label> Upload Aadhar card </label>&ensp;
      <input type="file" className="trial" required/>
      <br/><br/>
      </div></div>
      <button onClick={handleUpload}>Upload</button>
        
       
    
    
      </form>
    </div>
  )
}


export default App;
