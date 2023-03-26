import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useInterval from 'use-interval';
import './App.css';

function App() {
  const [postData, setPostData] = useState('');
  const [getData, setGetData] = useState([]);
  const [clicked, setCliked] =useState(false);

  const handlePostClick = async () => {
    try {
      if(clicked === true){
        const response = await axios.post('http://localhost:3001/posts', { title: 'Estado' , body: '1'});
        console.log(response.data);}
      else{
        const response = await axios.post('http://localhost:3001/posts', { title: 'Estado' , body: '0'});
        console.log(response.data);}
      setCliked(!clicked);
    } catch (error) {
      console.error(error);
    }
  };

  const getInfoByTipo = (tipo) => {
    const info = getData.find(p => p.title === tipo);
    return info ? info.body : '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get?_sort=id&_order=desc&_limit=3');
        if(getInfoByTipo('Estado') === '0'){//Detenido
          setCliked(true);
        }
        else{
          setCliked(false);
        }
        setGetData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useInterval(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get?_sort=id&_order=desc&_limit=3');
        if(getInfoByTipo('Estado') === '0'){//Detenido
          setCliked(true);
        }
        else{
          setCliked(false);
        }
        setGetData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, 1000);

  return (
    <div>
      <div>
        <div className='Texto1'>
          <h1>pH:</h1>
          <p>{getInfoByTipo('pH')}</p>
          <h1>Conductividad:</h1>
          <p>{getInfoByTipo('Electro')} S/m</p>
        </div>
        <button 
        style={{ position: "fixed", top: "8%", right: "71%" }}
        onClick={handlePostClick}
        className='button button1'
        >{clicked ? <h2>Iniciar Proceso</h2> : <h2>Detener Proceso</h2>}
      </button>
      </div>
    </div>
  );
}

export default App;

//para correr db  json-server --watch db.json --port 3001