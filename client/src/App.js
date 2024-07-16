import React, { useEffect, useState } from 'react';
import './App.css';
import { FaGithub } from "react-icons/fa";
import { RingLoader } from 'react-spinners';

const App = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({url});
    setIsLoading(true);
    setResult('');
    const payload = { url };
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setResult(data.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
    });
  };

  useEffect(() => {
    console.log(isLoading)
  },[isLoading])

  return (
    <div>
      <a href="https://www.github.com/" className='right-8 absolute' >
          <FaGithub size={30} color={"white"}/>
          </a>
      {/* <div className="heading flex flex-col md:mt-12 mt-10 font-semibold text-center m-6 h-[70px] md:text-5xl text-3xl bg-gradient-to-r from-green-900 via-blue-400 to-indigo-400 text-transparent bg-clip-text">
        
          Phishing Predictor
        </div> */}
        <div class="content">
        <h1 class="title">Diabetics Predictor
          <div class="aurora">
            <div class="aurora__item"></div>
            <div class="aurora__item"></div>
            <div class="aurora__item"></div>
            <div class="aurora__item"></div>
          </div>
        </h1>
      </div>

        <form id="fileForm" className='md:mt-12 mx-auto md:w-[50%] w-[90%]' onSubmit={handleSubmit}>
            <label className="input input-bordered rounded-xl max-md:text-sm flex items-center gap-3 pr-0 py-1">
              URL :  
            <input type="text"
              className="grow border-l max-md:text-sm pl-4" 
              placeholder="Enter your url " 
              id="urlInput"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn btn-active btn-primary btn-sm mr-2"  type="submit">{isLoading? <RingLoader  color={"#ffffff"} size={26}/> : "Check"}</button>
          </label>

        </form>
        {/* <RingLoader color={"#ffffff"} size={30}/> */}

      <div id="result" className={`flex justify-center mt-12 text-xl ${result === "Phishy Url" ? "text-red-600" : "text-green-500"}`}>{result}</div>

      <div className="flex justify-center bottom-0 gap-3 mb-12 absolute w-[100vh]">
          
      </div>
    </div>
  );
};

export default App;
