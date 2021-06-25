import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './pages/Main.js';
import Add from './pages/Add.js';
import Completed from './pages/Completed.js';
import reportWebVitals from './reportWebVitals';
import {useState, useEffect} from 'react';
import moment from 'moment';
import Cookies from 'universal-cookie';

const Index =()=>{
  //eslint-disable-next-line
  const cookies = new Cookies();
  if(cookies.get('events')===undefined){
    cookies.set('events',{
      'Sunday':{events:[]},'Monday':{events:[]},'Tuesday':{events:[]}, "Wednesday":{events:[]}, "Thursday":{events:[]}, "Friday":{events:[]}, "Saturday":{events:[]}
    }, {path:'/'})
  }
  if (cookies.get('completed')===undefined){
    cookies.set('completed',{events:[]}, {path:'/'})
  }
  var [events, setEvents] = useState(cookies.get('events'))
    //eslint-disable-next-line
  var [completed, setCompleted] = useState(cookies.get('completed'))
  
  useEffect(() => {
    cookies.set('events',events, {path:'/'})
    cookies.set('completed',completed, {path:'/'})
  }, [events,completed,cookies]);

  const [secondPage, setSecondPage] = useState('none')
  const [actDay, setActDay] = useState(moment().format('dddd'));
  let [gotoPage,setGotoPage]=useState('')

  const pager = ()=>{
    if (secondPage === "none"){return "" }
        else if (secondPage === "add"){return (
      <Add goto={[gotoPage,setGotoPage]} events={[events,setEvents]} page={[secondPage,setSecondPage]} actDay={[actDay,setActDay]}/>)}
    else if (secondPage === "comp"){return (
      <Completed completed={[completed,setCompleted]} goto={[gotoPage,setGotoPage]} events={[events,setEvents]} page={[secondPage,setSecondPage]} actDay={[actDay,setActDay]}/>
      )}
  }

  return(
    <React.StrictMode>
    <div style={{display:"flex", flexDirection:"row", overflow:"hidden"}} >
      <Main goto={[gotoPage,setGotoPage]} events={[events,setEvents]} completed={[completed,setCompleted]} page={[secondPage,setSecondPage]} actDay={[actDay,setActDay]}/>
      {pager()}
    </div>
  </React.StrictMode>
  
  )
}

ReactDOM.render(
  <Index></Index>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
